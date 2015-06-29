'use strict;'

var Resume = React.createClass({
    render: function() {
        var data = (function() {
            var _data = null;
            var self = this;
            $.ajax({
                url: 'data/le_resume.json',
                type: 'get',
                error: function(data) {
                    console.log(data);
                },
                success: function(data) {
                    self._data = jQuery.parseJSON(data); //do something with data
                }
            });
            return _data;
        })();
        return (
            React.createElement('div', {
                className: "main"
            }, null)
        );
    }
});

React.render(
    React.createElement(Resume, null),
    document.body
);