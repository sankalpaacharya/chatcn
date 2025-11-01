import { AudioVisualizerExperience } from '@/components/chatcn/audio-visualizer'
import React from 'react'

const AudioVisualizerPreview = () => {
  return (
    <AudioVisualizerExperience
        background="#050505"                  
        sphereColor="#0a0a0a"                
        orbitProps={{
            enabled: true,
            enableZoom: false,
            enablePan: true,
            autoRotate: true,
            autoRotateSpeed: 0.3
        }}    
        envProps={{
            preset:"city",
            resolution: 256
        }}       
        showGrid={true}           
        gridProps={{
            args: [200, 200],
            cellSize: 2,
            cellThickness: 1,
            cellColor: "#6f6f6f",
            sectionSize: 8,
            sectionThickness: 2,
            sectionColor: "#ffffff",
            infiniteGrid: false,
            position: [0, 0.01, 0],
        }}
    />
  )
}

export default AudioVisualizerPreview