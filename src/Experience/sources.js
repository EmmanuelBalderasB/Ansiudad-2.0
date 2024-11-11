export default [
    {
        name: 'environmentMapTexture',
        type: 'cubeTexture',
        path:
        [
            'textures/environmentMap/px.jpg',
            'textures/environmentMap/nx.jpg',
            'textures/environmentMap/py.jpg',
            'textures/environmentMap/ny.jpg',
            'textures/environmentMap/pz.jpg',
            'textures/environmentMap/nz.jpg'
        ]
    },
    {
        name: 'grassColorTexture',
        type: 'texture',
        path: 'textures/dirt/color.jpg'
    },
    {
        name: 'grassNormalTexture',
        type: 'texture',
        path: 'textures/dirt/normal.jpg'
    },
    {
        name: 'buildingModel',
        type: 'gltfModel',
        path: 'models/building/building.gltf'
    },
    {
        name: 'portalModel',
        type: 'gltfModel',
        path: 'models/portal/portal.glb'
    },
    {
        name: 'portalModelCone',
        type: 'gltfModel',
        path: 'models/Cone/cone2.glb'
    }
]