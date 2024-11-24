'use strict';
'require uci';
'require form';
'require view';
'require poll';
'require rpc';
var conf = 'vlmcsd';
var callServiceList = rpc.declare({ object: 'service', method: 'list', params: ['name'], expect: { '': {} } });
var pollAdded = false;
function getServiceStatus() {
    return L.resolveDefault(callServiceList(conf), {}).then(function (res) {
        var is_running = false;
        try {
            is_running = res[conf]['instances']['vlmcsd']['running'];
        } catch (e) { }
        return is_running;
    });
}
function kmsServiceStatus() {
    return Promise.all([getServiceStatus()]);
}
function kmsRenderStatus(res) {
    var renderHTML = "";
    var isRunning = res[0];
    if (isRunning) {
        renderHTML += "<span style=\"color:green;font-weight:bold\">" + _("KMS Server") + " " + _("RUNNING") + "</span>";
    } else {
        renderHTML += "<span style=\"color:red;font-weight:bold\">" + _("KMS Server") + " " + _("NOT RUNNING") + "</span>";
        return renderHTML;
    }
    return renderHTML;
}
return view.extend({
    load: function () { return Promise.all([uci.load('luci'), uci.load('vlmcsd')]); }, render: function (stats) {
        var m, s, o;
        m = new form.Map('vlmcsd', _('KMS'));
        m.title = _("KMS Server");
        m.description = _("A KMS Server Emulator to active your Windows or Office");

        s = m.section(form.NamedSection, '_status');
        s.anonymous = true;
        s.render = function (section_id) {
            var renderStatus = function () {
                return L.resolveDefault(kmsServiceStatus()).then(function (res) {
                    var view = document.getElementById("service_status");
                    if (view == null) {
                        return;
                    }
                    view.innerHTML = kmsRenderStatus(res);
                });
            }
            if (pollAdded == false) {
                poll.add(renderStatus, 1);
                pollAdded = true;
            }
            return E('div', { class: 'cbi-section' }, [E('div', { id: 'service_status' }, _('Collecting data ...'))]);
        }

        s = m.section(form.TypedSection, "vlmcsd", _("Settings"));
        s.anonymous = true;

        o = s.option(form.Flag, "enabled", _("Enable"), _("Enable or disable KMS Server"));
        o.rmempty = false;
        o.default = o.disabled;

        o = s.option(form.Value, "server_name", _("Server Name"), _("KMS Server name"));
        o.default = "kms";
        o.datatype = "hostname";
        o.rempty = false;

        o = s.option(form.Flag, "auto_activate", _("Auto activate"), _("Enable or disable auto activate"));
        o.rmempty = false;
        o.default = o.disabled;

        return m.render();
    }
});