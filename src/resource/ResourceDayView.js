
/* A day view with x all-day cell area at the top, and a time grid below
----------------------------------------------------------------------------------------------------------------------*/

fcViews.resourceDay = ResourceDayView; // register the view

function ResourceDayView(calendar) {
    ResourceView.call(this, calendar); // call the super-constructor
}


ResourceDayView.prototype = createObject(ResourceView.prototype); // define the super-class
$.extend(ResourceDayView.prototype, {

    name: "resourceDay",


    incrementDate: function(date, delta) {
        var out = date.clone().stripTime().add(delta, "days");
        out = this.skipHiddenDays(out, delta < 0 ? -1 : 1);
        return out;
    },


    render: function(date) {

        this.cellToDate = function () {
            var d = this.dayOffsetToDate(0);
            return d;
        };

        this.start = this.intervalStart = date.clone().stripTime();
        this.end = this.intervalEnd = this.start.clone().add(1, "days");

        this.title = this.calendar.formatDate(this.start, this.opt("titleFormat"));

        for (var i = 0; i < this.calendar.options.resources.length; i++) {
            this.calendar.options.resources[i].col = i;
        }
        ResourceView.prototype.render.call(this, this.calendar.options.resources.length); // call the super-method
    }

});
