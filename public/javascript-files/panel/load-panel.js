import { GUI } from "https://cdn.jsdelivr.net/npm/three@0.125/examples/jsm/libs/dat.gui.module.js";
import { setWeight } from "../animations/load-animations.js"
import { mixer, baseActions, additiveActions } from "../models/components/avatar.js"

let currentBaseAction = "run";
let panelSettings;
const crossFadeControls = [];


export default function createPanel() {
	const panel = new GUI({ width: 310 });

	const folder1 = panel.addFolder("Base Actions");
	const folder2 = panel.addFolder("Additive Action Weights");
	const folder3 = panel.addFolder("General Speed");

	panelSettings = {
		"modify time scale": 1.0,
	};

	const baseNames = ["None", ...Object.keys(baseActions)];

	for (let i = 0, l = baseNames.length; i !== l; ++i) {
		const name = baseNames[i];
		const settings = baseActions[name];
		panelSettings[name] = function() {
			const currentSettings = baseActions[currentBaseAction];
			const currentAction = currentSettings ? currentSettings.action : null;
			const action = settings ? settings.action : null;

			prepareCrossFade(currentAction, action, 0.35);
		};

		crossFadeControls.push(folder1.add(panelSettings, name));
	}

	for (const name of Object.keys(additiveActions)) {
		const settings = additiveActions[name];

		panelSettings[name] = settings.weight;
		folder2
			.add(panelSettings, name, 0.0, 1.0, 0.01)
			.listen()
			.onChange(function(weight) {
				setWeight(settings.action, weight);
				settings.weight = weight;
			});
	}

	folder3
		.add(panelSettings, "modify time scale", 0.0, 1.5, 0.01)
		.onChange(modifyTimeScale);

	folder1.open();
	folder2.open();
	folder3.open();

	crossFadeControls.forEach(function(control) {
		control.classList1 =
			control.domElement.parentElement.parentElement.classList;
		control.classList2 = control.domElement.previousElementSibling.classList;

		control.setInactive = function() {
			control.classList2.add("control-inactive");
		};

		control.setActive = function() {
			control.classList2.remove("control-inactive");
		};

		const settings = baseActions[control.property];

		if (!settings || !settings.weight) {
			control.setInactive();
		}
	});
}

function modifyTimeScale(speed) {
	mixer.timeScale = speed;
}

function prepareCrossFade(startAction, endAction, duration) {
	// If the current action is 'idle', execute the crossfade immediately;
	// else wait until the current action has finished its current loop

	if (currentBaseAction === "idle" || !startAction || !endAction) {
		executeCrossFade(startAction, endAction, duration);
	} else {
		synchronizeCrossFade(startAction, endAction, duration);
	}

	// Update control colors

	if (endAction) {
		const clip = endAction.getClip();
		currentBaseAction = clip.name;
	} else {
		currentBaseAction = "None";
	}

	crossFadeControls.forEach(function(control) {
		const name = control.property;

		if (name === currentBaseAction) {
			control.setActive();
		} else {
			control.setInactive();
		}
	});
}

