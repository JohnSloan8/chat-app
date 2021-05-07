import avatarLookAt from "../look.js"

export default function createKeyBindings() {
  document.addEventListener("keypress", function(event) {
    if ([37, 39, 65, 68].includes(event.keyCode)) {
      lookControl(event.keycode)
    }
  });
}

function lookControl(k) {
  
}
