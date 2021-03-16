import runAnimationSequence from "./chain.js";
import { model } from "../models/components/avatar.js";

window.makeEntrance = makeEntrance;

export default function makeEntrance() {
  let animations = [
    ["walk", 2, [['position.x', -0.04]],
    ["stand", 1, [['rotation.y', -0.02]]],
    ["ready", 1],
  ]];

  runAnimationSequence(animations);
}
