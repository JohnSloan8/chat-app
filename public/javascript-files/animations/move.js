import { movementController, model } from "../models/components/avatar.js"

window.moveModel = moveModel;
export default function moveModel() {

  //console.log('moving')
  if ( movementController.rotation.bool ) {

    //console.log('rotating')
    model.rotation.x += movementController.rotation.x;
    model.rotation.y += movementController.rotation.y;
    model.rotation.z += movementController.rotation.z;

  } else if ( movementController.position.bool ) {

    console.log('changing position')
    model.position.x += movementController.position.x;
    model.position.y += movementController.position.y;
    model.position.z += movementController.position.z;

  }


}
