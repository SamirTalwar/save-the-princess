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

        this.dialogue = $('<div id="dialogue">').css({
            position: 'absolute',
            left: '50px',
            right: '50px',
            bottom: '50px',
            height: '100px',
            padding: '25px',
            background: 'rgba(48, 48, 48, 0.5)',
            fontFamily: 'monospace',
            fontSize: '1.5em',
            color: 'white',
            zIndex: 100
        });
        $(document.body).append(this.dialogue);

        this.narrative.call(scope);
        callTree(actions)();
    };

    Interaction.prototype.stop = function() {
        this.dialogue && $(this.dialogue).remove();
        this.timeout && clearTimeout(this.timeout);
    };

    function write(text, callback) {
        $(this.dialogue).append($('<p>').html(text));
        this.timeout = setTimeout(callback, 2000);
    }

    function clear(callback) {
        $(this.dialogue).empty();
        this.timeout = setTimeout(callback, 500);
    }

    function editor(callback) {
        callback();
    }

    function act(behaviour, callback) {
        behaviour();
        callback();
    }

    function destroy() {
        this.locations = [];
    }

    function callTree(actions) {
        if (actions.length === 0) {
            return function() { };
        }

        return function() {
            actions[0][0].apply(undefined, actions[0].slice(1).concat([callTree(actions.slice(1))]));
        };
    }

    return Interaction;
});
