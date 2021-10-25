import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap';
import ClassAdapter from './ClassAdapter';
import './CollaboratorComponent.css';

const FormComponents = ClassAdapter(null, {
    __init: function () {
        for (let i in arguments[0]) {
            this[i] = arguments[0][i];
        }
    },
    getName: function () {
        return this.name || "UnnamedComponent";
    },
    getLabel: function () {
        return this.label || "CustomComponent";
    },
    getClassname: function () {
        return this.className || "EmptyClassnameComponent";
    },
    getDirectStyle: function () {
        return this.directStyle || {};
    },
    getElementPosition: function (elemId) {
        let offsetLeft = 0;
        let offsetTop = 0;
        let offsetTrail = document.getElementById(elemId);

        while (offsetTrail) {
            offsetLeft += offsetTrail.offsetLeft;
            offsetTop += offsetTrail.offsetTop;
            offsetTrail = offsetTrail.offsetParent;
        }
        if (navigator.userAgent.indexOf('Mac') !== -1 && typeof document.body.leftMargin !== 'undefined') {
            offsetLeft += document.body.leftMargin;
            offsetTop += document.body.topMargin;
        }

        //It has been noticed that offsetTop if 69 pixels more for IE 6
        if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
            let ieversion = new Number(RegExp.$1)
            //if (ieversion=6 && ieversion<7)getClassname            // {
            //if(offsetTop&gt;78) offsetTop -= 79;
            //}
        }
        return { left: offsetLeft, top: offsetTop };
    }
});

const ButtonComponent = ClassAdapter(FormComponents, {
    getStateAttribute: function () {
        return this.stateAttr || null;
    },
    executeOnClick: function () {
        return this.clickMethod || null;
    },
    renderComponent: function () {
        return (<Button className={this.getClassname()} style={this.getDirectStyle()} onClick={this.executeOnClick()} color="primary">{this.getLabel()}</Button>)
    }
});

const InputComponents = ClassAdapter(FormComponents, {
    __init: function () {
        InputComponents.uber.__init.apply(this, arguments);
    },
    getEditableState: function () {
        return this.editable || true;
    },
    getDefaultValue: function () {
        return this.defaultValue || "";
    },
    getStateAttribute: function () {
        return this.stateAttr || null;
    },
    getPlaceholder: function () {
        return this.placeholder || 'Please type any input';
    },
    getValue: function () {
        return this.value || "";
    },
    executeOnChange: function () {
        return this.changeMethod || null;
    }
});

const InputText = ClassAdapter(InputComponents, {
    renderComponent: function () {
        return (<Input type="text" style={this.getDirectStyle()} value={this.getValue()} onChange={this.executeOnChange()} placeholder={this.getPlaceholder()} />)
    }
});

const InputGroupComponent = ClassAdapter(InputComponents, {
    getInputDirectStyle: function () {
        return this.inputDirectStyle || {};
    },
    renderComponent: function () {
        return (
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0" style={this.getDirectStyle()}>
                <Label for="exampleEmail" className="mr-sm-2">{this.getLabel()}</Label>
                <Input type="text" value={this.getValue()} onChange={this.executeOnChange()} placeholder={this.getPlaceholder()} style={this.getInputDirectStyle()} />
            </FormGroup>
        )
    }
})

const ModalComponents = ClassAdapter(FormComponents, {
    __init: function () {
        ModalComponents.uber.__init.apply(this, arguments);
    },
    getHeaderTitle: function () {
        return this.headerTitle || "ModalComponent";
    },
    getBodyHeaderText: function () {
        return this.bodyHeaderText || "ModalComponent";
    },
    executeOnToggle: function () {
        return this.onToggleMethod || null;
    },
    getIsOpen: function () {
        return this.isOpen || false;
    },
    getContent: function () {
        return this.content || (<div></div>);
    }
})

const NotificationPopup = ClassAdapter(ModalComponents, {
    renderComponent: function () {
        return (
            <Modal isOpen={this.getIsOpen()} toggle={this.executeOnToggle()} name={this.getName()}>
                <ModalHeader toggle={this.executeOnToggle()}>{this.getHeaderTitle()}</ModalHeader>
                <ModalBody>{this.getBodyHeaderText()}</ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.executeOnToggle()}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={this.executeOnToggle()}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
});

const FormModal = ClassAdapter(ModalComponents, {
    renderComponent: function () {
        return (
            <Modal isOpen={this.getIsOpen()} toggle={this.executeOnToggle()} name={this.getName()} style={{ maxWidth: '100%', width: '90%', maxHeight: '100%', height: '90%' }} size="lg">
                <ModalHeader toggle={this.executeOnToggle()}>{this.getHeaderTitle()}</ModalHeader>
                {this.getContent()}
            </Modal>
        )
    }
});

const FormModalWrapperClass = ClassAdapter(ModalComponents, {
    getChildren: function () {
        return this.children || (<div></div>);
    },
    renderComponent: function () {
        return (
            <Modal
                isOpen={this.getIsOpen()}
                toggle={this.executeOnToggle()}
                name={this.getName()}
                style={{ maxWidth: '100%', width: '95%' }}
                size="lg"
            >
                <ModalHeader toggle={this.executeOnToggle()}>{this.getHeaderTitle()}</ModalHeader>
                {this.getChildren()}
            </Modal>
        )
    }
});

const LinkWrapperClass = ClassAdapter(FormComponents, {
    __init: function () {
        LinkWrapperClass.uber.__init.apply(this, arguments);
    },
    getLinkTarget: function () {
        return this.to || "";
    },
    executeMouseEnter: function () {
        return this.mouseOver || null;
    },
    executeMouseLeave: function () {
        return this.mouseOver || null;
    },
    renderComponent: function () {
        return (
            <div onMouseEnter={() => this.executeMouseEnter()} onMouseLeave={() => this.executeMouseLeave()}>
                <Link to={this.getLinkTarget()} className={this.getClassname()}>{'ab'}</Link>
            </div>
        )
    }
});

const TableComponent = ClassAdapter(FormComponents, {
    __init: function () {
        TableComponent.uber.__init.apply(this, arguments);
        this.offlineData = [];
    },
    getFields: function () {
        return this.fields || [];
    },
    getHeight: function () {
        return this.height || null;
    },
    getData: function () {
        return this.data || null;
    },
    getTableWidth: function () {
        return this.tableWidth || "1000px";
    },
    getDisplayedFields: function () {
        let fields = this.getFields();
        let counter = 0;
        let totalDisplayed = 0;
        while (counter < fields.length) {
            if (fields[counter].showHeader) {
                totalDisplayed++;
            }
            counter++;
        }
        return totalDisplayed;
    },
    getOfflineData: function () {
        return this.offlineData;
    },
    setCurrentSortfield: function (field) {
        this.currentSortfield = field;
    },
    getCurrentSortfield: function () {
        return this.currentSortfield;
    },
    setOfflineData: function (existingOfflineData, sortField, sortDirection)
    {
        if (!existingOfflineData)
        {
            this.offlineData = this.getData();
        }
        else
        {
            this.offlineData = existingOfflineData;
        }

        let counter = 0;
        let newData = [];
        while (true)
        {
            newData.push(this.offlineData[counter]);

            let counter2 = newData.length - 1;
            while (counter > 0)
            {
                if (sortDirection === "ASC" || sortDirection === null || this.offlineData.sortField != this.getCurrentSortfield()) {
                    if (newData[counter2][sortField] < newData[(counter2 - 1)][sortField]) {
                        let tempData = newData[counter2];
                        newData[counter2] = newData[counter2 - 1]
                        newData[(counter2 - 1)] = tempData;
                    }
                }
                else
                {
                    if (newData[counter2][sortField] > newData[(counter2 - 1)][sortField])
                    {
                        let tempData = newData[counter2];
                        newData[counter2] = newData[counter2 - 1]
                        newData[(counter2 - 1)] = tempData;
                    }
                }

                counter2--;
                if (counter2 === 0)
                    break;
            }

            counter++;
            if (counter >= this.offlineData.length)
                break
        } 

        this.offlineData = newData;
        this.offlineData.sortField = sortField;
        this.offlineData.sortDirection = sortDirection;
    },
    executeOnDoubleClick: function (e) {
        if (this.doubleClickEvent) {
            let fields = this.getFields();
            let counter = 0;
            let rowData = {};
            while (counter < e.currentTarget.childElementCount){
                rowData[fields[counter].name] = e.currentTarget.children[counter].innerText;
                counter++;
            }
            this.doubleClickEvent(e, rowData)
        } else {
            return false;
        }
    },
    renderTable: function ()
    {
        const [tableHeaderWidth, setTableHeaderWidth] = useState(null);
        const [tableDataCellWidth, setTableDataCellWidth] = useState(null);
        const [browserScrollbarWidth, setBrowserScrollbarWidth] = useState(null);

        const [offlineDataState, setOfflineDataState] = useState(null);
        const [offlineDataSortField, setOfflineDataSortField] = useState(null);
        const [offlineDataSortDirection, setOfflineDataSortDirection] = useState(null);

        const [tableFields, setTableFields] = useState(this.getFields());
        const [dragSource, setDragSource] = useState(null);

        const [seletedRowKey, setSelectedRowKey] = useState('');

        if (browserScrollbarWidth === null)
        {
            let tempTable = document.createElement("div");
            tempTable.className = "CollaboratorTable";
            tempTable.id = "TableTemp_" + this.getName();
            tempTable.style.visibility = "hidden";

            let tempTableBody = document.createElement("div");
            tempTableBody.className = "tbody";

            let tempTableTr = document.createElement("div");
            tempTableTr.className = "tr";
            tempTableTr.id = "TableTempTR_" + this.getName();

            let counter = 0;
            let totalDisplayed = this.getDisplayedFields();

            while (counter < totalDisplayed){
                let tempTableTd = document.createElement("div");
                tempTableTd.className = "td";
                tempTableTr.appendChild(tempTableTd); // is this append child part going to consume a lot of memory?
                counter++;
            }

            tempTableBody.appendChild(tempTableTr);
            tempTable.appendChild(tempTableBody);
            document.getElementById('root').appendChild(tempTable);

            let bodyWidth = window.getComputedStyle(document.getElementsByTagName("body")[0]).getPropertyValue('width');
            let TRWidth = window.getComputedStyle(document.getElementById("TableTempTR_" + this.getName())).getPropertyValue('width');

            setBrowserScrollbarWidth(parseInt(bodyWidth) - parseInt(TRWidth))
            document.getElementById('root').removeChild(tempTable);
        }

        useEffect(() =>
        {
            let headerWidth = 400;
            let tdWidth = 100;
            if (document.getElementsByName("Table_" + this.getName()))
            {
                let tableComp = document.getElementsByName("Table_" + this.getName());
                for (let i in tableComp)
                {
                    if (typeof tableComp[i] === "object" && tableComp[i].id != "Table_" + this.getName() + "_" + i)
                    {
                        if (tableHeaderWidth === null)
                        {
                            headerWidth = parseInt(window.getComputedStyle(tableComp[i].parentNode).getPropertyValue("width"));
                            headerWidth = headerWidth - parseInt(window.getComputedStyle(tableComp[i].parentNode).getPropertyValue("padding-left"));
                            headerWidth = headerWidth - parseInt(window.getComputedStyle(tableComp[i].parentNode).getPropertyValue("padding-right"));

                            tdWidth = ((headerWidth - (2.5 * this.getDisplayedFields()) - browserScrollbarWidth) / this.getDisplayedFields()); // 4 is total of padding + margin
                        }
                    }
                }
            }

            if (tableHeaderWidth === null) {
                setTableHeaderWidth(headerWidth);
                setTableDataCellWidth(tdWidth);
            }

        }, [])

        return (
            <div
                className="CollaboratorTable"
                name={'Table_' + this.getName()}
                style={{ align: 'center', width: (tableHeaderWidth === null ? ("500px") : (tableHeaderWidth + "px")) }}
            >
                {
                    <div className="thead" name={'TableHead_' + this.getName()} style={{ width: (tableHeaderWidth === null ? "0px" : (tableHeaderWidth + "px")) }}>
                        <div
                            className="tr"
                            key={'0_' + this.getName()}
                            name={'TableHeadTR_' + this.getName()}
                        >
                        { 
                            tableFields.map((mappedData, i) => ((mappedData.showHeader)
                            ?
                            (
                                <div
                                    className="td"
                                    key={this.getName() + '_' + i}
                                    style={{ maxWidth: (tableDataCellWidth === null) ? "50px" : (tableDataCellWidth + "px"), width: (tableDataCellWidth === null) ? "50px" : (tableDataCellWidth + "px") }}
                                    onDragOver={(e) => { e.preventDefault(); }}
                                    draggable={true}
                                    onDrop={() => {
                                        let sourceIndex, targetIndex;
                                        let tableFieldsTemp = [];

                                        for (let key in tableFields) {
                                            if (tableFields[key].name === dragSource) {
                                                sourceIndex = key;
                                            }
                                            if (tableFields[key].name === mappedData.name) {
                                                targetIndex = key;
                                            }
                                            tableFieldsTemp[key] = tableFields[key];
                                        }

                                        tableFieldsTemp[targetIndex] = tableFields[sourceIndex];
                                        tableFieldsTemp[sourceIndex] = tableFields[targetIndex];

                                        setTableFields(tableFieldsTemp);
                                    }}
                                    onDragStart={() => {
                                        setDragSource(mappedData.name);
                                    }}
                                >
                                    {mappedData.header}
                                    <div
                                        className="HeaderSortingSign"
                                        style={{ position: 'absolute', right: '4px', top: '1.5px' }}
                                        onClick={() => {
                                            this.setCurrentSortfield(mappedData.name);
                                            if (offlineDataSortField === null) {
                                                setOfflineDataSortDirection("DESC")
                                            } else {
                                                setOfflineDataSortDirection(offlineDataSortDirection === "ASC" ? "DESC" : "ASC")
                                            }
                                            setOfflineDataState(this.getOfflineData(this.setOfflineData(offlineDataState, mappedData.name, offlineDataSortDirection)));
                                            setOfflineDataSortField(mappedData.name);
                                            tableFields[i].nextSortDirection = tableFields[i].nextSortDirection === "DESC" ? "ASC" : "DESC";
                                            setTableFields(tableFields);
                                        }}
                                    >
                                        {mappedData.name === offlineDataSortField ? (mappedData.nextSortDirection === "DESC" ? "\u02C5" : "^") : "-"}
                                    </div>
                                </div>
                            )
                            :
                            null
                            ))
                        }
                        </div>
                    </div>
                }
                <div className="tbody" name={'TableBody_' + this.getName()} style={{ maxHeight: (this.getHeight() === null ? 'auto' : this.getHeight())} }>
                {
                    (offlineDataSortField === null)
                        ?
                        this.getData().map((mappedData, i) => ( // Initial data load from Implementor
                            <div
                                className={seletedRowKey === 'ContentTR_' + this.getName() + '_' + i ? "trHighlighted" : "tr"} 
                                key={'ContentTR_' + this.getName() + '_' + i}
                                name={'TableBodyTR_' + this.getName()}
                                onDoubleClick={this.executeOnDoubleClick.bind(this)}
                                onClick={() => {
                                    setSelectedRowKey('ContentTR_' + this.getName() + '_' + i)
                                }}
                            >
                                {
                                    tableFields.map((mappedData2, j) => ((mappedData2.showHeader)
                                        ?
                                        (
                                            <div
                                                className="td"
                                                key={this.getName() + '_' + j}
                                                style={{ maxWidth: (tableDataCellWidth === null) ? "50px" : (tableDataCellWidth + "px"), width: (tableDataCellWidth === null) ? "50px" : (tableDataCellWidth + "px") }}
                                            >
                                                    {(!mappedData[mappedData2.name]) || mappedData[mappedData2.name] === "" ? '\u00A0' : mappedData[mappedData2.name]}
                                            </div>
                                        )
                                        :
                                        null
                                    ))
                                }
                            </div>
                        ))
                        :
                        (offlineDataSortField != offlineDataState.sortField)
                            ?
                            (
                                offlineDataState.map((mappedData, i) => (
                                    <div
                                        className={seletedRowKey === 'ContentTR_' + this.getName() + '_' + i ? "trHighlighted" : "tr"}
                                        key={'ContentTR_' + this.getName() + '_' + i}
                                        name={'TableBodyTR_' + this.getName()}
                                        onDoubleClick={this.executeOnDoubleClick.bind(this)}
                                        onClick={() => {
                                            setSelectedRowKey('ContentTR_' + this.getName() + '_' + i)
                                        }}
                                    >
                                        {
                                            tableFields.map((mappedData2, j) => (
                                                (mappedData2.showHeader)
                                                    ?
                                                    (
                                                        <div
                                                            className="td"
                                                            key={this.getName() + '_' + j}
                                                            style={{ width: (tableDataCellWidth === null) ? "50px" : (tableDataCellWidth + "px") }}
                                                        >
                                                            {(!mappedData[mappedData2.name]) || mappedData[mappedData2.name] === "" ? '\u00A0' : mappedData[mappedData2.name]}
                                                        </div>
                                                    )
                                                    :
                                                    null
                                            ))
                                        }
                                    </div>
                                ))
                            )
                            :
                            (
                                offlineDataState.map((mappedData, i) => (
                                    <div
                                        className={seletedRowKey === 'ContentTR_' + this.getName() + '_' + i ? "trHighlighted" : "tr"}
                                        key={this.getName() + '_' + this.getName() + '_' + i}
                                        name={'TableBodyTR_' + this.getName()}
                                        onDoubleClick={this.executeOnDoubleClick.bind(this)}
                                        onClick={() => {
                                            setSelectedRowKey('ContentTR_' + this.getName() + '_' + i)
                                        }}
                                    >
                                        {
                                            tableFields.map((mappedData2, j) => (
                                                (mappedData2.showHeader)
                                                    ?
                                                    (
                                                        <div
                                                            className="td"
                                                            key={this.getName() + '_' + j}
                                                            style={{ width: (tableDataCellWidth === null) ? "50px" : (tableDataCellWidth + "px") }}
                                                        >
                                                                {(!mappedData[mappedData2.name]) || mappedData[mappedData2.name] === "" ? '\u00A0' : mappedData[mappedData2.name]}
                                                        </div>
                                                    )
                                                    :
                                                    null
                                            ))
                                        }
                                    </div>
                                ))
                            )
                }
                </div>
            </div>
        )
    }
});

export const GenerateButton = (props) => {
    let NewButton = new ButtonComponent(props);
    return NewButton.renderComponent();
}

export const GenerateInputText = (props) => {
    let NewInputText = new InputText(props);
    return NewInputText.renderComponent();
}

export const GenerateNotificationPopup = (props) => {
    let NotificationPopUp = new NotificationPopup(props);
    return NotificationPopUp.renderComponent();
}

export const GenerateModalForm = (props) => {
    let formModal = new FormModal(props);
    return formModal.renderComponent();
}

export const GenerateInputGroup = (props) => {
    let inputGroupComponent = new InputGroupComponent(props);
    return inputGroupComponent.renderComponent();
}

export const LinkWrapper = (props) => {
    let linkWrapper = new LinkWrapperClass(props);
    return linkWrapper.renderComponent();
}

export const FormModalWrapper = (props) => {
    let formModalWrapper = new FormModalWrapperClass(props);
    return formModalWrapper.renderComponent();
}

export const TableWrapper = (props) => {
    let tableComponent = new TableComponent(props);
    return tableComponent.renderTable();
}