import React, { Suspense, useContext } from "react";
import { Vector3, Color3 } from "@babylonjs/core/Maths/math";

import {
  Model,
  SceneLoaderContextProvider,
  SceneLoaderContext,
} from "react-babylonjs";

const ProgressFallback = (props) => {
  const sceneLoaderContext = useContext(SceneLoaderContext);

  let loadProgress = 0;
  if (sceneLoaderContext.lastProgress) {
    const progress = sceneLoaderContext.lastProgress;
    loadProgress = progress.lengthComputable
      ? progress.loaded / progress.total
      : progress.loaded / 10000; // TODO: provide option to input file size for proper loading.
  }

  return (
    <transformNode
      name="load-mesh"
      rotation={props.rotation}
      position={props.center}
    >
      <box
        key="progress"
        name="boxProgress"
        scaling={new Vector3(loadProgress, 1, 1)}
      >
        <standardMaterial
          name="progress-mat"
          diffuseColor={props.progressBarColor}
          specularColor={Color3.Black()}
        />
      </box>
      <box
        key="back"
        name="boxBack"
      />
    </transformNode>
  );
};

const ScaledModelWithProgress = (props) => {
  return (
    <SceneLoaderContextProvider>
      <Suspense
        fallback={
          <ProgressFallback
            progressBarColor={props.progressBarColor}
            rotation={props.progressRotation ?? props.modelRotation}
            center={props.center}
          />
        }
      >
        <Model
          key={props.sceneFilename}
          reportProgress
          position={props.center}
          rootUrl={props.rootUrl}
          sceneFilename={props.sceneFilename}
          rotation={props.modelRotation}
          onModelLoaded={props.onModelLoaded}
        />
      </Suspense>
    </SceneLoaderContextProvider>
  );
};

export default ScaledModelWithProgress;