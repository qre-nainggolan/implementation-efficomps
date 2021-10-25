import ClassAdapter from './ClassAdapter';

const HTTPProxyClass = ClassAdapter(null, {
    __init: function () {
        for (let i in arguments[0]) {
            this[i] = arguments[0][i];
        }
    },
    getName: function () {
        return this.name || "UnnamedHTTPProxyComponent";
    },
    getUrlTarget: function () {
        return this.urlTarget || "UrlTargetUndefined";
    },
    executeOnSuccessMethod: function (dataResponse) {
        return this.onSuccess(dataResponse) || null;
    },
    getOnFailedMethod: function () {
        return this.onFailed || null;
    },
    getParameter: function () {
        return this.params || "";
    },
    getRequestMethod: function () {
        return this.method || null;
    },
    setXHR: function (xhr) {
        this.xhr = xhr || null;
    },
    getXHR: function () {
        return this.xhr;
    },
    executeStateChange: function () {
        let xhr = this.getXHR();
        if (xhr.readyState === 4 && xhr.status === 200) {
            let ResponseContent = xhr.responseText;
            let JSONData = JSON.parse(ResponseContent);
            this.executeOnSuccessMethod(JSONData.data);
        }
    },
    processRequest: function () {
        let createXHR = () => {
            try { return new XMLHttpRequest(); } catch (e) { }
            try { return new window.ActiveXObject("Msxml2.XMLHTTP.6.0"); } catch (e) { }
            try { return new window.ActiveXObject("Msxml2.XMLHTTP.3.0"); } catch (e) { }
            try { return new window.ActiveXObject("Msxml2.XMLHTTP"); } catch (e) { }
            try { return new window.ActiveXObject("Microsoft.XMLHTTP"); } catch (e) { }
            return null;
        }

        let xhr = createXHR();
        if (xhr) {
            this.setXHR(xhr);
            xhr.open(this.getRequestMethod(), this.getUrlTarget(), true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
            xhr.send(this.getParameter());
            xhr.onreadystatechange = this.executeStateChange.bind(this);
        }
    }
});

export const HTTPProxy = (props) => {
    let httpProxy = new HTTPProxyClass(props);
    return httpProxy.processRequest();
}