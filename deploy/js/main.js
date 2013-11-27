var Tree,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Tree = (function(_super) {
  __extends(Tree, _super);

  Tree.prototype._geometry = null;

  Tree.prototype._material = null;

  Tree.prototype._baseVertices = null;

  Tree.prototype._deformedVertices = null;

  function Tree() {
    var ratio, vertice, _i, _len, _ref;
    this._geometry = new THREE.CylinderGeometry(30, 40, 300, 9, 20);
    this._geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 150, 0));
    this._material = new THREE.MeshLambertMaterial({
      wireframe: false,
      color: 0xff0000,
      shading: THREE.FlatShading,
      lights: true
    });
    this._baseVertices = this._geometry.clone().vertices;
    this._deformedVertices = this._geometry.clone().vertices;
    _ref = this._deformedVertices;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      vertice = _ref[_i];
      ratio = vertice.y / 300;
      ratio = vertice.y / 300;
      vertice.x = vertice.x + 470 / 10 * Math.cos(ratio * 4) * ratio;
      vertice.y = vertice.y + 470 / 30 * Math.cos(ratio * 2) * ratio;
      vertice.z = vertice.z + 470 / 30 * Math.cos(ratio * 4) * ratio;
    }
    this._geometry.vertices = this._deformedVertices;
    THREE.Mesh.call(this, this._geometry, this._material);
  }

  Tree.prototype.update = function() {
    var dx;
    return dx = stage.mouse.x - (stage.size.w * .5);
  };

  return Tree;

})(THREE.Mesh);

var EngineSingleton, engine;

EngineSingleton = (function() {
  var EngineInstance, instance;

  function EngineSingleton() {}

  EngineInstance = (function() {
    function EngineInstance() {}

    EngineInstance.prototype._container = null;

    EngineInstance.prototype._stats = null;

    EngineInstance.prototype.renderer = null;

    EngineInstance.prototype.camera = null;

    EngineInstance.prototype.controls = null;

    EngineInstance.prototype.scene = null;

    EngineInstance.prototype.init = function(container) {
      this.renderer = new THREE.WebGLRenderer({
        alpha: false
      });
      this.renderer.setClearColor(0x416ca3, 1);
      this.renderer.setSize(stage.size.w, stage.size.h);
      this._container = container;
      this._container.appendChild(this.renderer.domElement);
      this.camera = new THREE.PerspectiveCamera(45, stage.size.w / stage.size.h, 1, 10000);
      this.camera.position.set(0, 800, 550);
      this.camera.lookAt(new THREE.Vector3(0, 0, -1280));
      this.scene = new THREE.Scene();
      return this._initLights();
    };

    EngineInstance.prototype._initLights = function() {
      var ambient, pointLight;
      ambient = new THREE.AmbientLight(0x8b937f);
      this.scene.add(ambient);
      pointLight = new THREE.PointLight(0xffffff, 2, 1500);
      pointLight.position.set(50, 50, 50);
      return this.scene.add(pointLight);
    };

    EngineInstance.prototype.update = function() {
      return this.renderer.render(this.scene, this.camera);
    };

    return EngineInstance;

  })();

  instance = null;

  EngineSingleton.get = function() {
    return instance != null ? instance : instance = new EngineInstance();
  };

  return EngineSingleton;

})();

engine = EngineSingleton.get();

var StageSingleton, stage,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

StageSingleton = (function() {
  var StageInstance, instance;

  function StageSingleton() {}

  StageInstance = (function() {
    StageInstance.prototype.lastMouse = null;

    StageInstance.prototype.mouse = null;

    StageInstance.prototype.size = null;

    StageInstance.prototype._$window = null;

    function StageInstance() {
      this._onResize = __bind(this._onResize, this);
      this._onMouseMove = __bind(this._onMouseMove, this);
      this.lastMouse = {
        x: 0.0,
        y: 0.0
      };
      this.mouse = {
        x: 0.0,
        y: 0.0
      };
      this.size = {
        w: 0,
        h: 0
      };
      this._$window = $(window);
      $(document).on("mousemove", this._onMouseMove);
      this._$window.on("resize", this._onResize);
      this._onResize();
    }

    StageInstance.prototype._onMouseMove = function(e) {
      this.lastMouse.x = this.mouse.x;
      this.lastMouse.y = this.mouse.y;
      this.mouse.x = e.clientX;
      return this.mouse.y = e.clientY;
    };

    StageInstance.prototype._onResize = function(e) {
      this.size.w = this._$window.width();
      return this.size.h = this._$window.height();
    };

    return StageInstance;

  })();

  instance = null;

  StageSingleton.get = function() {
    return instance != null ? instance : instance = new StageInstance();
  };

  return StageSingleton;

}).call(this);

stage = StageSingleton.get();

var Main,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Main = (function() {
  Main.prototype._tree = null;

  Main.prototype._stats = null;

  function Main() {
    this._update = __bind(this._update, this);
    engine.init(document.getElementById("main"));
    this._tree = new Tree();
    this._tree.position.y = 300;
    engine.scene.add(this._tree);
    this._stats = new Stats();
    this._stats.domElement.style.position = "absolute";
    this._stats.domElement.style.right = "0";
    this._stats.domElement.style.top = "0";
    this._stats.domElement.style.zIndex = 100;
    document.body.appendChild(this._stats.domElement);
    this._update();
  }

  Main.prototype._update = function() {
    this._stats.update();
    engine.update();
    this._tree.update();
    return requestAnimationFrame(this._update);
  };

  return Main;

})();

new Main();
