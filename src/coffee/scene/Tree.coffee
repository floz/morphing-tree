class Tree extends THREE.Mesh

	_geometry: null
	_material: null
	_baseVertices: null
	_deformedVertices: null

	constructor: ->
		@_geometry = new THREE.CylinderGeometry 30, 40, 300, 9, 20
		@_geometry.applyMatrix new THREE.Matrix4().makeTranslation 0, 150, 0 
		@_material = new THREE.MeshLambertMaterial wireframe: false, color: 0xff0000, shading: THREE.FlatShading, lights: true

		@_baseVertices = @_geometry.clone().vertices
		@_deformedVertices = @_geometry.clone().vertices
		for vertice in @_deformedVertices
			ratio = vertice.y / 300
			
			ratio = vertice.y / 300
			vertice.x = vertice.x + 470 / 10 * Math.cos( ratio * 4 ) * ratio
			vertice.y = vertice.y + 470 / 30 * Math.cos( ratio * 2 ) * ratio
			vertice.z = vertice.z + 470 / 30 * Math.cos( ratio * 4 ) * ratio

		@_geometry.vertices = @_deformedVertices

		THREE.Mesh.call @, @_geometry, @_material

	update: ->
		dx = stage.mouse.x - ( stage.size.w * .5 )
		# for vertice, i in @_geometry.vertices
		# 	baseVertice = @_baseVertices[ i ]

		# 	ratio = baseVertice.y / 300
		# 	vertice.x = baseVertice.x + dx / 10 * Math.cos( ratio * 4 ) * ratio
		# 	vertice.y = baseVertice.y + dx / 10 * Math.cos( ratio * 2 ) * ratio
		# 	vertice.z = baseVertice.z + dx / 30 * Math.cos( ratio * 4 ) * ratio

		# @_geometry.verticesNeedUpdate = true 

		# console.log stage.size.w, stage.mouse.x, dx