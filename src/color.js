export class Color{
    constructor(r,g,b,a=1) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    toSting(){
        const {r,g,b,a} = this;
        return`rgba(${r}, ${g}, ${b}, ${a})`;
    }
    toArray(){
        const {r,g,b,a} = this;
        return[r,g,b,a];
    }
    set(r,g,b,a){
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    add(ar,ag,ab,aa){
        const {r,g,b,a} = this;
        this.r = Math.abs((r+ar)%255);
        this.g = Math.abs((g+ag)%255);
        this.b = Math.abs((b+ab)%255);
        this.a = Math.abs((a+aa)%255);
    }
}