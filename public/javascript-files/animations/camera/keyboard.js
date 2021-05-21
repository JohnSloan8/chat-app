import TWEEN from 'https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js'
import { noParticipants } from "../../scene/settings.js"
import { participants } from "../../models/components/avatar.js"
import avatarLookAt from "../look.js"
import { posRot } from "../../scene/components/pos-rot.js"

window.cameraLookAt = cameraLookAt
function cameraLookAt(toWhom, duration) {
	avatarLookAt(0, toWhom, duration)
  for (let i=1; i<noParticipants; i++) {
    participants[i].model.traverse(function(object) {
      if (object.isMesh) {
        if (object.name !== "Wolf3D_Glasses") {
          if (i !== toWhom) {
            object.material.color = {
              r: 0.667,
              g: 0.667,
              b: 0.667,
              isColor: true
            }
          } else {
            object.material.color = {
              r: 1.33,
              g: 1.33,
              b: 1.33,
              isColor: true
            }
            new TWEEN.Tween(object.material.color).to({
              r: 1.33,
              g: 1.33,
              b: 1.33,
              isColor: true
            }, 1000).start()
          }
        }
      }
    });
  }
  let cameraTweenRotation = new TWEEN.Tween(camera.rotation).to(posRot[noParticipants].camera.rotations[toWhom], duration)
    .easing(TWEEN.Easing.Quintic.Out)
    .easing(TWEEN.Easing.Quintic.Out)
  cameraTweenRotation.start()
}

export default function createKeyBindings() {
  document.addEventListener("keydown", function(event) {
    if ( ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes( event.key ) ) {
      event.preventDefault();
      lookControl(event.key)
    }
  });
}

function lookControl(k) {
  console.log('key:', k)
  let turnToLookAt
  if ( k === 'ArrowLeft' ) {
    participants[0].states.currentlyLookingAt -= 1;
  } else if ( k === 'ArrowRight' ) {
    participants[0].states.currentlyLookingAt += 1;
  }
  if ( participants[0].states.currentlyLookingAt < 1 ) {
    participants[0].states.currentlyLookingAt = noParticipants-1;
  } else if ( participants[0].states.currentlyLookingAt >= noParticipants ) {
    participants[0].states.currentlyLookingAt = 1;
  }
  cameraLookAt( participants[0].states.currentlyLookingAt, 500 )
}

export { cameraLookAt }

