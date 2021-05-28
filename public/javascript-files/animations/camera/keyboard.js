import TWEEN from 'https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js'
import { noParticipants } from "../../scene/settings.js"
import { participants } from "../../models/components/avatar.js"
import { posRot } from "../../scene/components/pos-rot.js"
import { table } from "../../scene/components/table.js"
import avatarLookAt from "../look.js"

window.cameraLookAt = cameraLookAt
function cameraLookAt(toWhom, duration) {
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
          }
        }
      }
    });
    if (toWhom === -1) {
      table.material.color.set( '#772200' )
    } else {
      table.material.color.set( '#551100' )
    }
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
  if (participants[0].states.currentlyLookingAt === -1) { // table
    if ( k === 'ArrowUp' ) {
      participants[0].states.currentlyLookingAt = participants[0].states.previouslyLookingAt;
    } else if ( k === 'ArrowLeft' ) {
      participants[0].states.currentlyLookingAt = participants[0].states.previouslyLookingAt - 1;
    } else if ( k === 'ArrowRight' ) {
      participants[0].states.currentlyLookingAt = participants[0].states.previouslyLookingAt + 1;
    }
    if ( k !== 'ArrowDown' ) {
      participants[0].states.previouslyLookingAt = -1
    }
  } else {
    participants[0].states.previouslyLookingAt = participants[0].states.currentlyLookingAt;
    if ( k === 'ArrowLeft' ) {
      participants[0].states.currentlyLookingAt -= 1;
    } else if ( k === 'ArrowRight' ) {
      participants[0].states.currentlyLookingAt += 1;
    } else if ( k === 'ArrowDown' ) {
      participants[0].states.currentlyLookingAt = -1;
    }
  }
  if ( participants[0].states.currentlyLookingAt === 0 ) {
    participants[0].states.currentlyLookingAt = noParticipants-1;
  } else if ( participants[0].states.currentlyLookingAt >= noParticipants ) {
    participants[0].states.currentlyLookingAt = 1;
  }
  avatarLookAt( 0, participants[0].states.currentlyLookingAt, 500 )
}

export { cameraLookAt }

