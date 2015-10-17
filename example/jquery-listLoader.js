(function($) {
    'use script';

    $.fn.listLoader = function(options) {

        var settings = $.extend({
                source: '',
                step: 2,
                hideLoader: true
            }, options), // extend setting

            flag = false, // the flag that indicate the completion.

            stepped = 1, // start

            item = options.itemElement == undefined ? $('.item') : $(options.itemElement),
            items = options.itemsElement == undefined ? $('.items') : $(options.itemsElement),
            loaderElement = options.loaderElement == undefined ? $('.items-loader') : $(options.loaderElement),

            /**
             * finished the load.
             */
            finished = function() {

                if (settings.finishedFunction == undefined) {

                    if (settings.hideLoader === false) return;

                    loaderElement.remove();

                } else {
                    settings.finishedFunction();
                }

                return;
            },

            /**
             * append the items to dom.
             */
            append = function(value) {
                var name;
                var part;

                item.remove();
                for (name in value) {
                    if (value.hasOwnProperty(name)) {
                        part = item.find('*[data-field="' + name + '"]');

                        if (part.length) {
                            part.text(value[name]);
                        }
                    }
                }

                item.clone().appendTo(items);
            },

            /**
             * load the items.
             * @param  integer offset
             * @param  integer count
             */
            load = function(offset, count) {

                if (flag === true) {
                    finished();

                    return;
                }

                $.ajax({
                    url: settings.source,
                    type: 'get',
                    dateType: 'json',
                    data: {offset: offset, count: count},
                    success: function(data) {
                        var items = data.items;

                        if (items.length) {
                            $(items).each(function(index, value) {
                                append(value);
                            });

                            stepped = stepped + count;
                        }

                        if (data.last === true) {
                            flag = true; // no resource to left.
                            finished();
                        }
                    }
                });

            };

        if (settings.source.length) {
            loaderElement.on('click', function() {
                load(stepped, settings.step);

                return false;
            });

            load(1, settings.step);
        } else {
            console.log('Source required.'); // confirm client to add the source.
        }
    }
})(jQuery);