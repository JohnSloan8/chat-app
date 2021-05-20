import { noParticipants } from "../../scene/settings.js"
import { participants } from "../../models/components/avatar.js"
import avatarLookAt from "../look.js"

export default function cameraLookAt(whom) {
  for (let i=1; i<noParticipants; i++) {
    participants[i].model.traverse(function(object) {
      if (object.isMesh) {
        if (i !== toWhom) {
          object.material.color = {
            r: 1,
            g: 1,
            b: 1,
            isColor: true
          }
        } else {
          object.material.color = {
            r: 1.5,
            g: 1.5,
            b: 1.5,
            isColor: true
          }
          new TWEEN.Tween(object.material.color).to({
            r: 1,
            g: 1,
            b: 1,
            isColor: true
          }, 1000).start()
        }
      }
    });
  }
  if ( who === 0 ) {
    let cameraTweenRotation = new TWEEN.Tween(camera.rotation).to(me.rotations[toWhom], duration)
      .easing(TWEEN.Easing.Quintic.Out)
    let cameraTweenPosition = new TWEEN.Tween(camera.position).to({x: -0.2*participants[toWhom].rotations[0].head.y}, duration)
      .easing(TWEEN.Easing.Quintic.Out)
    cameraTweenRotation.start()
    cameraTweenPosition.start()
  }
}

function createKeyBindings() {
  document.addEventListener("keypress", function(event) {
    if ([37, 39, 65, 68].includes(event.keyCode)) {
      lookControl(event.keycode)
    }
  });
}

export { createKeyBindings }

