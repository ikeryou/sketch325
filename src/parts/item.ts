import { MyObject3D } from "../webgl/myObject3D";
import { Mesh } from 'three/src/objects/Mesh';
import { LineSegments } from 'three/src/objects/LineSegments';
import { Object3D } from 'three/src/core/Object3D';
import { Util } from "../libs/util";
import { Vector3 } from 'three/src/math/Vector3';
import { Color } from 'three/src/math/Color';
import { MeshBasicMaterial } from 'three/src/materials/MeshBasicMaterial';
import { LineBasicMaterial } from 'three/src/materials/LineBasicMaterial';
import { Conf } from "../core/conf";
import { Func } from "../core/func";

export class Item extends MyObject3D {

  private _id:number;
  private _item:Array<{mesh:Object3D, noise:Vector3}> = [];
  private _speed:number = 2;

  constructor(opt:any) {
    super()

    this._id = opt.id;
    this._c = this._id * 3;

    const num = 1;
    for(let i = 0; i < num; i++) {
      let m;
      if(Util.instance.hit(2)) {
        m = new LineSegments(
          opt.geoLine,
          new LineBasicMaterial({
            color:new Color(Util.instance.randomArr([0x000000, 0x000000])),
          })
        );
      } else {
        m = new Mesh(
          opt.geoShape,
          new MeshBasicMaterial({
            color:Util.instance.randomArr(Conf.instance.COLOR),
          })
        );
      }


      this.add(m);

      this._item.push({
        mesh:m,
        noise:new Vector3(Util.instance.random(0, 1), Util.instance.random(0, 1), Util.instance.random(0, 1))
      });
    }
  }


  public updateItem(opt:{radius:number, moveRadius:number, center:Vector3}):void {
    const baseRadius = opt.radius * 1;

    // スケールとか
    this._item.forEach((val,i) => {
      const m = val.mesh;

      let radius = Util.instance.map(i, baseRadius, baseRadius * 0.5, 0, this._item.length - 1);
      m.scale.set(radius, radius, 1);
    })

    // くるくる
    const r = Util.instance.radian(this._c)
    this.position.x = opt.center.x + Func.instance.sin1(r * 0.8) * opt.moveRadius;
    this.position.y = opt.center.y + Func.instance.sin2(r) * opt.moveRadius;
  }


  protected _update():void {
    this._c += this._speed;
  }


  protected _resize(): void {
    super._resize();
  }
}