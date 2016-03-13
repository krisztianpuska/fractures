System.register(["angular2/core", "../../shared/pipes/MapToIterable"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, MapToIterable_1;
    var OptionsToggleComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (MapToIterable_1_1) {
                MapToIterable_1 = MapToIterable_1_1;
            }],
        execute: function() {
            OptionsToggleComponent = (function () {
                function OptionsToggleComponent() {
                }
                // Control grid classes
                OptionsToggleComponent.prototype.toggleGridClass = function (selected, set) {
                    // Remove all setitem from classes array
                    for (var _i = 0, _a = this.options[set].options; _i < _a.length; _i++) {
                        var option = _a[_i];
                        var optionIndex = this.classes.indexOf(option);
                        if (optionIndex !== -1)
                            this.classes.splice(optionIndex, 1);
                    }
                    // Add new class to array
                    if (selected[1])
                        this.classes.push(selected[1]);
                    // Set selected on options
                    this.options[set].selected = selected[0];
                };
                OptionsToggleComponent = __decorate([
                    core_1.Component({
                        inputs: ["classes", "options"],
                        pipes: [MapToIterable_1.MapToIterable],
                        selector: "options-toggle",
                        templateUrl: "app/components/grid/options-toggle.component.html"
                    }), 
                    __metadata('design:paramtypes', [])
                ], OptionsToggleComponent);
                return OptionsToggleComponent;
            }());
            exports_1("OptionsToggleComponent", OptionsToggleComponent);
        }
    }
});