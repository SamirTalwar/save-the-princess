define(function() {
    function Interaction(locations, code, narrative) {
        this.locations = locations;
        this.code = code;
        this.narrative = narrative;
    }

    Interaction.prototype.isAt = function(x, y) {
        return _(this.locations).any(function(location) { return location.x == x && location.y == y; });
    };

    Interaction.prototype.execute = function() {
        var actions = [],
            scope = {
                write: function(text) { actions.push([write, text]); },
                clear: function() { actions.push([clear]); },
                editor: function() { actions.push([editor]); },
                act: function(behaviour) { actions.push([act, behaviour]); },
                destroy: function() { actions.push([destroy]); },
                context: {}
            };

        dialogue().empty().show();

        this.narrative.call(scope);
        callTree(this, actions)();
    };

    Interaction.prototype.stop = function() {
        dialogue().hide();
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    };

    function write(text, callback) {
        dialogue().append($('<p>').html(text));
        this.timeout = setTimeout(callback, 200);
    }

    function clear(callback) {
        dialogue().empty();
        this.timeout = setTimeout(callback, 50);
    }

    function editor(callback) {
        $('#map').animate({width: '50%'});
        $('#editor').show().animate({width: '50%'});
        $('#editor > textarea').text(this.code);
        $('#dialogue').animate({left: '50%'});
        callback();
    }

    function act(behaviour, callback) {
        behaviour();
        callback();
    }

    function destroy() {
        this.locations = [];
    }

    function callTree(context, actions) {
        if (actions.length === 0) {
            return function() { };
        }

        return function() {
            actions[0][0].apply(context, actions[0].slice(1).concat([callTree(context, actions.slice(1))]));
        };
    }

    function dialogue() {
        return $('#dialogue');
    }

    return Interaction;
});
