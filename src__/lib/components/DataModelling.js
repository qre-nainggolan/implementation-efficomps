import ClassAdapter from './ClassAdapter';

const DataModellingClass = ClassAdapter(null, {
    __init: function () {
        for (let i in arguments[0]) {
            this[i] = arguments[0][i];
        }
    },
    getName: function () {
        return this.name || "UnnamedDataModellingComponent";
    },
    getFields: function () {
        return this.fields || [];
    }
});

export const DataModelling = (props) => {
    let dataModelling = new DataModellingClass(props);
    return dataModelling.getFields();
}