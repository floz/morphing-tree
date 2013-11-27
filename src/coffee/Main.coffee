class Main

    _tree: null
    _stats: null

    constructor: ->
        engine.init document.getElementById "main"

        @_tree = new Tree()
        @_tree.position.y = 300
        engine.scene.add @_tree

        @_stats = new Stats()
        @_stats.domElement.style.position = "absolute"
        @_stats.domElement.style.right = "0"
        @_stats.domElement.style.top = "0"
        @_stats.domElement.style.zIndex = 100
        document.body.appendChild @_stats.domElement

        @_update()

    _update: =>
        @_stats.update()
        engine.update()
        @_tree.update()

        requestAnimationFrame @_update
        
new Main()
