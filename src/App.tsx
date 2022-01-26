import "./App.css";
import { useState } from 'react';
import { RenderModel } from "./Render";
import { Engine, Scene } from "react-babylonjs";
import Select from '@mui/material/Select';
import { SelectChangeEvent } from "@mui/material/Select/SelectInput";
import MenuItem from '@mui/material/MenuItem';

type Asset = {
  filename: string,
  name: string
}

const ASSETS: Asset[] = [{
  filename: 'Avocado.gltf',
  name: 'Avocado'
}, {
  filename: 'box.glb',
  name: 'Box'
}, {
  filename: 'eyes-a.glb',
  name: 'Eyes A'
}, {
  filename: 'island.glb',
  name: 'Island'
}, {
  filename: 'knight.glb',
  name: 'Knight'
}, {
  filename: 'ny.glb',
  name: 'NY'
}, {
  filename: 'pencil.glb',
  name: 'Pencil'
}, {
  filename: 'prayer.glb',
  name: 'Prayer'
}, {
  filename: 'rims.gltf',
  name: 'Rims'
}, {
  filename: 'robo.glb',
  name: 'Robo'
}, {
  filename: 'selva.glb',
  name: 'Selva'
}, {
  filename: 'soldier.glb',
  name: 'Soldier'
}, {
  filename: 'spider.glb',
  name: 'Spider'
}, {
  filename: 'star.gltf',
  name: 'Star'
}, {
  filename: 'statue.glb',
  name: 'Statue'
}]

const App = () => {
  const [sceneFilename, setSceneFilename] = useState('statue.glb');

  const handleChange = (event: SelectChangeEvent<string>) => {
    // https://github.com/BabylonJS/Babylon.js/blob/master/sandbox/src/components/renderingZone.tsx#L148
    // TODO: engine.clearInternalTexturesCache();
    setSceneFilename(event.target.value);
  };

  return (
    <>
      <div style={{float: 'right', position: 'absolute', top: '10px', right: '10px'}}>
        <Select
          value={sceneFilename}
          onChange={handleChange}
        >
          {ASSETS.map(asset => 
            <MenuItem key={asset.name} value={asset.filename}>{asset.name}</MenuItem>
          )}
        </Select>
      </div>
      <div style={{ width: "100vw", height: "100vh" }}>
        <Engine
          antialias
          adaptToDeviceRatio
          engineOptions={{
            premultipliedAlpha: false,
            preserveDrawingBuffer: true,
            antialias: true,
          }}
          canvasStyle={{ width: "100%", height: "100%" }}
        >
          <Scene>
            <RenderModel sceneFilename={sceneFilename} />
          </Scene>
        </Engine>
      </div>
    </>
  );
};

export default App;
