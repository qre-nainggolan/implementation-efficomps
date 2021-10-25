import React, { useState } from 'react';
import ClassAdapter from './ClassAdapter';
import './CollaboratorComponent.css';

const ContainerWrapper = ClassAdapter(null, {
    __init: function () {
        for (let i in arguments[0]) {
            this[i] = arguments[0][i];
        }
    },
    getName: function () {
        return this.name || "UnnamedContainerComponent";
    },
    getLabel: function () {
        return this.label || "CustomContainerComponent";
    },
    getClassname: function () {
        return this.className || "EmptyClassnameContainerComponent";
    },
    getDirectStyle: function () {
        return this.directStyle || {};
    },
    getNavigatorMenu: function () {
        return this.getNavigatorMenu();
    },
    getChildren: function () {
        return this.children || (<div></div>);
    },
    getLeftColumnClassname: function () {
        return (this.leftColumnStatus === "unhide" || (!this.leftColumnStatus)) ? "EfficompsContainerLeftColumnUnhide" : "EfficompsContainerLeftColumnHide";
    },
    setLeftColumnClassname: function (newClassname) {
        this.leftColumnStatus = newClassname;
    },
    getContentColumnClassname: function () {
        return (this.leftColumnStatus === "unhide" || (!this.leftColumnStatus)) ? "EfficompsContainerContentColumn" : "EfficompsContainerContentColumnWider";
    },
    getLeftColumn: function () {
        return this.leftColumn || (<div></div>);
    },
    renderContainer: function () {
        const [leftColumnClassnameState, setLeftColumnClassnameState] = useState("EfficompsContainerLeftColumnUnhide");
        const [contentColumnClassnameState, setContentColumnClassnameState] = useState("EfficompsContainerContentColumn");
        let timer;

        return (
            <div
                className="EfficompsContainerWrapper"
                name={"EfficompsContainerWrapper_" + this.getName()}
            >
                <div
                    className={leftColumnClassnameState}
                    onMouseEnter={() => {
                        clearTimeout(timer);
                        if (leftColumnClassnameState === "EfficompsContainerLeftColumnHide") {
                            timer = setTimeout(() => {
                                setLeftColumnClassnameState("EfficompsContainerLeftColumnHideHover");
                                clearTimeout(timer);
                            }, 250);
                        }
                    }}
                    onMouseOut={() => {
                        clearTimeout(timer);
                    }}
                >
                    <div
                        className="EfficompsLeftColumnToggleButton"
                        onMouseEnter={() => {
                            clearTimeout(timer);
                            if (leftColumnClassnameState === "EfficompsContainerLeftColumnHide") {
                                timer = setTimeout(() => {
                                    setLeftColumnClassnameState("EfficompsContainerLeftColumnHideHover");
                                    clearTimeout(timer);
                                }, 250);
                            }
                        }}
                        onClick={() => {
                            setLeftColumnClassnameState(leftColumnClassnameState === "EfficompsContainerLeftColumnUnhide" ? "EfficompsContainerLeftColumnHide" : "EfficompsContainerLeftColumnUnhide");
                            setContentColumnClassnameState(contentColumnClassnameState === "EfficompsContainerContentColumnWider" ? "EfficompsContainerContentColumn" : "EfficompsContainerContentColumnWider");
                            this.setLeftColumnClassname(leftColumnClassnameState);
                        }}
                    ></div>
                    <div
                        className="EfficompsLeftColumnMenuContainer"
                    >
                        {this.getLeftColumn()}
                    </div>
                </div>
                <div
                    className={contentColumnClassnameState}
                    onMouseEnter={() => {
                        clearTimeout(timer);
                        if (leftColumnClassnameState === "EfficompsContainerLeftColumnHideHover") {
                            timer = setTimeout(() => {
                                setLeftColumnClassnameState("EfficompsContainerLeftColumnHide");
                                clearTimeout(timer);
                            }, 250);
                        }
                    }}
                >
                    {this.getChildren()}
                </div>
            </div>
        )
    }
});

export const ContainerComponent = (props) => {
    let containerWrapper = new ContainerWrapper(props);
    return containerWrapper.renderContainer();
}