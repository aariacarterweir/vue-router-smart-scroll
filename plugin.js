import { isMatch } from 'lodash';

class RouterSmartScroll {
    constructor(router, options = {}) {
        this.router = router;

        // merge options
        this.options = {
            exclude: false,
            include: false,
            defaultPosition: { x: 0, y: 0 },
            ...options,
        };

        // create memory object
        this.memory = {};

        // install to router
        this.install();
    }

    install() {
        // set scrollBehavior
        this.router.options.scrollBehavior = (to, from, savedPosition) => {
            if (savedPosition) {
                return savedPosition;
            }

            return this.position(to);
        };

        // set routerGate
        this.router.beforeEach((to, from, next) => {
            this.save(from);
            next();
        });
    }

    position(route) {
        if (! this.shouldRecall(route)) {
            this.purge(route);
            return this.options.defaultPosition;
        }

        return this.memory[route.name] || this.options.defaultPosition;
    }

    shouldRecall(route) {
        if (this.options.include && ! isMatch(route.params, this.options.include)) {
            return false;
        }

        if (this.options.exclude && isMatch(route.params, this.options.exclude)) {
            return false;
        }

        return true;
    }

    purge(route) {
        this.memory[route.name] = null;
    }

    save(route) {
        if (! route.name) {
            return;
        }

        this.memory[route.name] = {
            x: window.pageXOffset || document.documentElement.scrollLeft,
            y: window.pageYOffset || document.documentElement.scrollTop,
        };
    }
}

export default { install: (router, options) => new RouterSmartScroll(router, options) };
