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
  let cameraTweenRotation = new TWEEN.Tween(camera.rotation).to(posRot[noParticipants].camera.rotations[toWhom], duration)
    .easing(TWEEN.Easing.Quintic.Out)
  let cameraTweenPosition = new TWEEN.Tween(camera.position).to({x: -0.2*participants[toWhom].rotations[0].head.y}, duration)
    .easing(TWEEN.Easing.Quintic.Out)
  cameraTweenRotation.start()
  cameraTweenPosition.start()
}

export default function createKeyBindings() {
  console.trace()
  console.log('here')
  window.addEventListener("keypress", function(event) {
    if (event.keyCode == 65) {
      lookControl(event.keycode)
      alert('yo')
    }
  });
}

function lookControl(k) {
  console.log('k:', k)
}

export { cameraLookAt }

