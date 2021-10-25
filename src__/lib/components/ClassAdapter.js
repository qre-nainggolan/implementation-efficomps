export default function ClassAdapter (Parent, Properties) {
    let NewCreatedClass, F, i;
    NewCreatedClass = function () {
        if (NewCreatedClass.prototype.hasOwnProperty("__init")) {
            NewCreatedClass.prototype.__init.apply(this, arguments);
        }
        if (NewCreatedClass.uber && NewCreatedClass.uber.hasOwnProperty("__init")) {
            NewCreatedClass.uber.__init.apply(this, arguments);
        }
    }

    Parent = Parent || Object;

    F = function () { }
    F.prototype = Parent.prototype;
    NewCreatedClass.prototype = new F();
    NewCreatedClass.uber = Parent.prototype;

    for (i in Properties) {
        if (Properties.hasOwnProperty(i)) {
            NewCreatedClass.prototype[i] = Properties[i]
        }
    }

    return NewCreatedClass;
}