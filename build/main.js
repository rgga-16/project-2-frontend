
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
'use strict';

function noop() { }
function assign(tar, src) {
    // @ts-ignore
    for (const k in src)
        tar[k] = src[k];
    return tar;
}
function add_location(element, file, line, column, char) {
    element.__svelte_meta = {
        loc: { file, line, column, char }
    };
}
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function is_function(thing) {
    return typeof thing === 'function';
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
let src_url_equal_anchor;
function src_url_equal(element_src, url) {
    if (!src_url_equal_anchor) {
        src_url_equal_anchor = document.createElement('a');
    }
    src_url_equal_anchor.href = url;
    return element_src === src_url_equal_anchor.href;
}
function is_empty(obj) {
    return Object.keys(obj).length === 0;
}
function validate_store(store, name) {
    if (store != null && typeof store.subscribe !== 'function') {
        throw new Error(`'${name}' is not a store with a 'subscribe' method`);
    }
}
function subscribe(store, ...callbacks) {
    if (store == null) {
        return noop;
    }
    const unsub = store.subscribe(...callbacks);
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function component_subscribe(component, store, callback) {
    component.$$.on_destroy.push(subscribe(store, callback));
}
function create_slot(definition, ctx, $$scope, fn) {
    if (definition) {
        const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
        return definition[0](slot_ctx);
    }
}
function get_slot_context(definition, ctx, $$scope, fn) {
    return definition[1] && fn
        ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
        : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
    if (definition[2] && fn) {
        const lets = definition[2](fn(dirty));
        if ($$scope.dirty === undefined) {
            return lets;
        }
        if (typeof lets === 'object') {
            const merged = [];
            const len = Math.max($$scope.dirty.length, lets.length);
            for (let i = 0; i < len; i += 1) {
                merged[i] = $$scope.dirty[i] | lets[i];
            }
            return merged;
        }
        return $$scope.dirty | lets;
    }
    return $$scope.dirty;
}
function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
    if (slot_changes) {
        const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
        slot.p(slot_context, slot_changes);
    }
}
function get_all_dirty_from_scope($$scope) {
    if ($$scope.ctx.length > 32) {
        const dirty = [];
        const length = $$scope.ctx.length / 32;
        for (let i = 0; i < length; i++) {
            dirty[i] = -1;
        }
        return dirty;
    }
    return -1;
}
function exclude_internal_props(props) {
    const result = {};
    for (const k in props)
        if (k[0] !== '$')
            result[k] = props[k];
    return result;
}
function compute_rest_props(props, keys) {
    const rest = {};
    keys = new Set(keys);
    for (const k in props)
        if (!keys.has(k) && k[0] !== '$')
            rest[k] = props[k];
    return rest;
}

const globals = (typeof window !== 'undefined'
    ? window
    : typeof globalThis !== 'undefined'
        ? globalThis
        : global);
function append(target, node) {
    target.appendChild(node);
}
function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
}
function detach(node) {
    if (node.parentNode) {
        node.parentNode.removeChild(node);
    }
}
function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
        if (iterations[i])
            iterations[i].d(detaching);
    }
}
function element(name) {
    return document.createElement(name);
}
function svg_element(name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
}
function text(data) {
    return document.createTextNode(data);
}
function space() {
    return text(' ');
}
function empty() {
    return text('');
}
function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
}
function prevent_default(fn) {
    return function (event) {
        event.preventDefault();
        // @ts-ignore
        return fn.call(this, event);
    };
}
function attr(node, attribute, value) {
    if (value == null)
        node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
        node.setAttribute(attribute, value);
}
function to_number(value) {
    return value === '' ? null : +value;
}
function children(element) {
    return Array.from(element.childNodes);
}
function set_input_value(input, value) {
    input.value = value == null ? '' : value;
}
function set_style(node, key, value, important) {
    if (value == null) {
        node.style.removeProperty(key);
    }
    else {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
}
function select_option(select, value, mounting) {
    for (let i = 0; i < select.options.length; i += 1) {
        const option = select.options[i];
        if (option.__value === value) {
            option.selected = true;
            return;
        }
    }
    if (!mounting || value !== undefined) {
        select.selectedIndex = -1; // no option should be selected
    }
}
function select_value(select) {
    const selected_option = select.querySelector(':checked');
    return selected_option && selected_option.__value;
}
function toggle_class(element, name, toggle) {
    element.classList[toggle ? 'add' : 'remove'](name);
}
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
    const e = document.createEvent('CustomEvent');
    e.initCustomEvent(type, bubbles, cancelable, detail);
    return e;
}
class HtmlTag {
    constructor(is_svg = false) {
        this.is_svg = false;
        this.is_svg = is_svg;
        this.e = this.n = null;
    }
    c(html) {
        this.h(html);
    }
    m(html, target, anchor = null) {
        if (!this.e) {
            if (this.is_svg)
                this.e = svg_element(target.nodeName);
            /** #7364  target for <template> may be provided as #document-fragment(11) */
            else
                this.e = element((target.nodeType === 11 ? 'TEMPLATE' : target.nodeName));
            this.t = target.tagName !== 'TEMPLATE' ? target : target.content;
            this.c(html);
        }
        this.i(anchor);
    }
    h(html) {
        this.e.innerHTML = html;
        this.n = Array.from(this.e.nodeName === 'TEMPLATE' ? this.e.content.childNodes : this.e.childNodes);
    }
    i(anchor) {
        for (let i = 0; i < this.n.length; i += 1) {
            insert(this.t, this.n[i], anchor);
        }
    }
    p(html) {
        this.d();
        this.h(html);
        this.i(this.a);
    }
    d() {
        this.n.forEach(detach);
    }
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error('Function called outside component initialization');
    return current_component;
}
/**
 * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
 * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
 * it can be called from an external module).
 *
 * `onMount` does not run inside a [server-side component](/docs#run-time-server-side-component-api).
 *
 * https://svelte.dev/docs#run-time-svelte-onmount
 */
function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
}
/**
 * Creates an event dispatcher that can be used to dispatch [component events](/docs#template-syntax-component-directives-on-eventname).
 * Event dispatchers are functions that can take two arguments: `name` and `detail`.
 *
 * Component events created with `createEventDispatcher` create a
 * [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent).
 * These events do not [bubble](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture).
 * The `detail` argument corresponds to the [CustomEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail)
 * property and can contain any type of data.
 *
 * https://svelte.dev/docs#run-time-svelte-createeventdispatcher
 */
function createEventDispatcher() {
    const component = get_current_component();
    return (type, detail, { cancelable = false } = {}) => {
        const callbacks = component.$$.callbacks[type];
        if (callbacks) {
            // TODO are there situations where events could be dispatched
            // in a server (non-DOM) environment?
            const event = custom_event(type, detail, { cancelable });
            callbacks.slice().forEach(fn => {
                fn.call(component, event);
            });
            return !event.defaultPrevented;
        }
        return true;
    };
}
/**
 * Associates an arbitrary `context` object with the current component and the specified `key`
 * and returns that object. The context is then available to children of the component
 * (including slotted content) with `getContext`.
 *
 * Like lifecycle functions, this must be called during component initialisation.
 *
 * https://svelte.dev/docs#run-time-svelte-setcontext
 */
function setContext(key, context) {
    get_current_component().$$.context.set(key, context);
    return context;
}
/**
 * Retrieves the context that belongs to the closest parent component with the specified `key`.
 * Must be called during component initialisation.
 *
 * https://svelte.dev/docs#run-time-svelte-getcontext
 */
function getContext(key) {
    return get_current_component().$$.context.get(key);
}

const dirty_components = [];
const binding_callbacks = [];
let render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = /* @__PURE__ */ Promise.resolve();
let update_scheduled = false;
function schedule_update() {
    if (!update_scheduled) {
        update_scheduled = true;
        resolved_promise.then(flush$1);
    }
}
function add_render_callback(fn) {
    render_callbacks.push(fn);
}
function add_flush_callback(fn) {
    flush_callbacks.push(fn);
}
// flush() calls callbacks in this order:
// 1. All beforeUpdate callbacks, in order: parents before children
// 2. All bind:this callbacks, in reverse order: children before parents.
// 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
//    for afterUpdates called during the initial onMount, which are called in
//    reverse order: children before parents.
// Since callbacks might update component values, which could trigger another
// call to flush(), the following steps guard against this:
// 1. During beforeUpdate, any updated components will be added to the
//    dirty_components array and will cause a reentrant call to flush(). Because
//    the flush index is kept outside the function, the reentrant call will pick
//    up where the earlier call left off and go through all dirty components. The
//    current_component value is saved and restored so that the reentrant call will
//    not interfere with the "parent" flush() call.
// 2. bind:this callbacks cannot trigger new flush() calls.
// 3. During afterUpdate, any updated components will NOT have their afterUpdate
//    callback called a second time; the seen_callbacks set, outside the flush()
//    function, guarantees this behavior.
const seen_callbacks = new Set();
let flushidx = 0; // Do *not* move this inside the flush() function
function flush$1() {
    // Do not reenter flush while dirty components are updated, as this can
    // result in an infinite loop. Instead, let the inner flush handle it.
    // Reentrancy is ok afterwards for bindings etc.
    if (flushidx !== 0) {
        return;
    }
    const saved_component = current_component;
    do {
        // first, call beforeUpdate functions
        // and update components
        try {
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
        }
        catch (e) {
            // reset dirty state to not end up in a deadlocked state and then rethrow
            dirty_components.length = 0;
            flushidx = 0;
            throw e;
        }
        set_current_component(null);
        dirty_components.length = 0;
        flushidx = 0;
        while (binding_callbacks.length)
            binding_callbacks.pop()();
        // then, once components are updated, call
        // afterUpdate functions. This may cause
        // subsequent updates...
        for (let i = 0; i < render_callbacks.length; i += 1) {
            const callback = render_callbacks[i];
            if (!seen_callbacks.has(callback)) {
                // ...so guard against infinite loops
                seen_callbacks.add(callback);
                callback();
            }
        }
        render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
        flush_callbacks.pop()();
    }
    update_scheduled = false;
    seen_callbacks.clear();
    set_current_component(saved_component);
}
function update($$) {
    if ($$.fragment !== null) {
        $$.update();
        run_all($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback);
    }
}
/**
 * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
 */
function flush_render_callbacks(fns) {
    const filtered = [];
    const targets = [];
    render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
    targets.forEach((c) => c());
    render_callbacks = filtered;
}
const outroing = new Set();
let outros;
function group_outros() {
    outros = {
        r: 0,
        c: [],
        p: outros // parent group
    };
}
function check_outros() {
    if (!outros.r) {
        run_all(outros.c);
    }
    outros = outros.p;
}
function transition_in(block, local) {
    if (block && block.i) {
        outroing.delete(block);
        block.i(local);
    }
}
function transition_out(block, local, detach, callback) {
    if (block && block.o) {
        if (outroing.has(block))
            return;
        outroing.add(block);
        outros.c.push(() => {
            outroing.delete(block);
            if (callback) {
                if (detach)
                    block.d(1);
                callback();
            }
        });
        block.o(local);
    }
    else if (callback) {
        callback();
    }
}

function get_spread_update(levels, updates) {
    const update = {};
    const to_null_out = {};
    const accounted_for = { $$scope: 1 };
    let i = levels.length;
    while (i--) {
        const o = levels[i];
        const n = updates[i];
        if (n) {
            for (const key in o) {
                if (!(key in n))
                    to_null_out[key] = 1;
            }
            for (const key in n) {
                if (!accounted_for[key]) {
                    update[key] = n[key];
                    accounted_for[key] = 1;
                }
            }
            levels[i] = n;
        }
        else {
            for (const key in o) {
                accounted_for[key] = 1;
            }
        }
    }
    for (const key in to_null_out) {
        if (!(key in update))
            update[key] = undefined;
    }
    return update;
}
function get_spread_object(spread_props) {
    return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
}

function bind(component, name, callback) {
    const index = component.$$.props[name];
    if (index !== undefined) {
        component.$$.bound[index] = callback;
        callback(component.$$.ctx[index]);
    }
}
function create_component(block) {
    block && block.c();
}
function mount_component(component, target, anchor, customElement) {
    const { fragment, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    if (!customElement) {
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
            // if the component was destroyed immediately
            // it will update the `$$.on_destroy` reference to `null`.
            // the destructured on_destroy may still reference to the old array
            if (component.$$.on_destroy) {
                component.$$.on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
    }
    after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
        flush_render_callbacks($$.after_update);
        run_all($$.on_destroy);
        $$.fragment && $$.fragment.d(detaching);
        // TODO null out other refs, including component.$$ (but need to
        // preserve final state?)
        $$.on_destroy = $$.fragment = null;
        $$.ctx = [];
    }
}
function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
        dirty_components.push(component);
        schedule_update();
        component.$$.dirty.fill(0);
    }
    component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
}
function init$1(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const $$ = component.$$ = {
        fragment: null,
        ctx: [],
        // state
        props,
        update: noop,
        not_equal,
        bound: blank_object(),
        // lifecycle
        on_mount: [],
        on_destroy: [],
        on_disconnect: [],
        before_update: [],
        after_update: [],
        context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
        // everything else
        callbacks: blank_object(),
        dirty,
        skip_bound: false,
        root: options.target || parent_component.$$.root
    };
    append_styles && append_styles($$.root);
    let ready = false;
    $$.ctx = instance
        ? instance(component, options.props || {}, (i, ret, ...rest) => {
            const value = rest.length ? rest[0] : ret;
            if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                if (!$$.skip_bound && $$.bound[i])
                    $$.bound[i](value);
                if (ready)
                    make_dirty(component, i);
            }
            return ret;
        })
        : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    // `false` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
        if (options.hydrate) {
            const nodes = children(options.target);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.l(nodes);
            nodes.forEach(detach);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.c();
        }
        if (options.intro)
            transition_in(component.$$.fragment);
        mount_component(component, options.target, options.anchor, options.customElement);
        flush$1();
    }
    set_current_component(parent_component);
}
/**
 * Base class for Svelte components. Used when dev=false.
 */
class SvelteComponent {
    $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
    }
    $on(type, callback) {
        if (!is_function(callback)) {
            return noop;
        }
        const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
        callbacks.push(callback);
        return () => {
            const index = callbacks.indexOf(callback);
            if (index !== -1)
                callbacks.splice(index, 1);
        };
    }
    $set($$props) {
        if (this.$$set && !is_empty($$props)) {
            this.$$.skip_bound = true;
            this.$$set($$props);
            this.$$.skip_bound = false;
        }
    }
}

function dispatch_dev(type, detail) {
    document.dispatchEvent(custom_event(type, Object.assign({ version: '3.59.2' }, detail), { bubbles: true }));
}
function append_dev(target, node) {
    dispatch_dev('SvelteDOMInsert', { target, node });
    append(target, node);
}
function insert_dev(target, node, anchor) {
    dispatch_dev('SvelteDOMInsert', { target, node, anchor });
    insert(target, node, anchor);
}
function detach_dev(node) {
    dispatch_dev('SvelteDOMRemove', { node });
    detach(node);
}
function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation, has_stop_immediate_propagation) {
    const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
    if (has_prevent_default)
        modifiers.push('preventDefault');
    if (has_stop_propagation)
        modifiers.push('stopPropagation');
    if (has_stop_immediate_propagation)
        modifiers.push('stopImmediatePropagation');
    dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
    const dispose = listen(node, event, handler, options);
    return () => {
        dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
        dispose();
    };
}
function attr_dev(node, attribute, value) {
    attr(node, attribute, value);
    if (value == null)
        dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
    else
        dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
}
function prop_dev(node, property, value) {
    node[property] = value;
    dispatch_dev('SvelteDOMSetProperty', { node, property, value });
}
function set_data_dev(text, data) {
    data = '' + data;
    if (text.data === data)
        return;
    dispatch_dev('SvelteDOMSetData', { node: text, data });
    text.data = data;
}
function validate_each_argument(arg) {
    if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
        let msg = '{#each} only iterates over array-like objects.';
        if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
            msg += ' You can use a spread to convert this iterable into an array.';
        }
        throw new Error(msg);
    }
}
function validate_slots(name, slot, keys) {
    for (const slot_key of Object.keys(slot)) {
        if (!~keys.indexOf(slot_key)) {
            console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
        }
    }
}
function construct_svelte_component_dev(component, props) {
    const error_message = 'this={...} of <svelte:component> should specify a Svelte component.';
    try {
        const instance = new component(props);
        if (!instance.$$ || !instance.$set || !instance.$on || !instance.$destroy) {
            throw new Error(error_message);
        }
        return instance;
    }
    catch (err) {
        const { message } = err;
        if (typeof message === 'string' && message.indexOf('is not a constructor') !== -1) {
            throw new Error(error_message);
        }
        else {
            throw err;
        }
    }
}
/**
 * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
 */
class SvelteComponentDev extends SvelteComponent {
    constructor(options) {
        if (!options || (!options.target && !options.$$inline)) {
            throw new Error("'target' is a required option");
        }
        super();
    }
    $destroy() {
        super.$destroy();
        this.$destroy = () => {
            console.warn('Component was already destroyed'); // eslint-disable-line no-console
        };
    }
    $capture_state() { }
    $inject_state() { }
}

const subscriber_queue = [];
/**
 * Creates a `Readable` store that allows reading by subscription.
 * @param value initial value
 * @param {StartStopNotifier} [start]
 */
function readable(value, start) {
    return {
        subscribe: writable(value, start).subscribe
    };
}
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=} start
 */
function writable(value, start = noop) {
    let stop;
    const subscribers = new Set();
    function set(new_value) {
        if (safe_not_equal(value, new_value)) {
            value = new_value;
            if (stop) { // store is ready
                const run_queue = !subscriber_queue.length;
                for (const subscriber of subscribers) {
                    subscriber[1]();
                    subscriber_queue.push(subscriber, value);
                }
                if (run_queue) {
                    for (let i = 0; i < subscriber_queue.length; i += 2) {
                        subscriber_queue[i][0](subscriber_queue[i + 1]);
                    }
                    subscriber_queue.length = 0;
                }
            }
        }
    }
    function update(fn) {
        set(fn(value));
    }
    function subscribe(run, invalidate = noop) {
        const subscriber = [run, invalidate];
        subscribers.add(subscriber);
        if (subscribers.size === 1) {
            stop = start(set) || noop;
        }
        run(value);
        return () => {
            subscribers.delete(subscriber);
            if (subscribers.size === 0 && stop) {
                stop();
                stop = null;
            }
        };
    }
    return { set, update, subscribe };
}
function derived(stores, fn, initial_value) {
    const single = !Array.isArray(stores);
    const stores_array = single
        ? [stores]
        : stores;
    const auto = fn.length < 2;
    return readable(initial_value, (set) => {
        let started = false;
        const values = [];
        let pending = 0;
        let cleanup = noop;
        const sync = () => {
            if (pending) {
                return;
            }
            cleanup();
            const result = fn(single ? values[0] : values, set);
            if (auto) {
                set(result);
            }
            else {
                cleanup = is_function(result) ? result : noop;
            }
        };
        const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
            values[i] = value;
            pending &= ~(1 << i);
            if (started) {
                sync();
            }
        }, () => {
            pending |= (1 << i);
        }));
        started = true;
        sync();
        return function stop() {
            run_all(unsubscribers);
            cleanup();
            // We need to set this to false because callbacks can still happen despite having unsubscribed:
            // Callbacks might already be placed in the queue which doesn't know it should no longer
            // invoke this derived store.
            started = false;
        };
    });
}

/**
 * Copy a text to the clipboard. Will attempt to use the new `navigator.clipboard` API,
 * but will fallback to the `execCommand()` if `navigator.clipboard` is not available.
 *
 * This is shamelessly "copied" from {@link https://github.com/vuejs/vitepress/blob/43c89d66c0d8c87e244a0a0e73a897509b977e65/src/client/app/composables/copyCode.ts | vitepress source code}
 * @param {string} text - text to copy
 * @returns {Promise<void> | undefined}
 */
function copyToClipboard(text) {
	try {
		return navigator.clipboard.writeText(text);
	} catch {
		const element = document.createElement('textarea');
		const previouslyFocusedElement = document.activeElement;

		element.value = text;

		// Prevent keyboard from showing on mobile
		element.setAttribute('readonly', '');

		element.style.contain = 'strict';
		element.style.position = 'absolute';
		element.style.left = '-9999px';
		element.style.fontSize = '12pt'; // Prevent zooming on iOS

		const selection = document.getSelection();
		const originalRange = selection ? selection.rangeCount > 0 && selection.getRangeAt(0) : null;

		document.body.appendChild(element);
		element.select();

		// Explicit selection workaround for iOS
		element.selectionStart = 0;
		element.selectionEnd = text.length;

		document.execCommand('copy');
		document.body.removeChild(element);

		if (originalRange && selection) {
			selection.removeAllRanges(); // originalRange can't be truthy when selection is falsy
			selection.addRange(originalRange);
		}

		// Get the focus back on the previously focused element, if any
		if (previouslyFocusedElement) {
			/** @type {HTMLElement} */ (previouslyFocusedElement).focus();
		}
	}
}

async function pause(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function saveBase64Image(image_base64) {
    const response = await fetch("/save_image", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({image_data: image_base64})
    });
    if(!response.ok) {
        throw new Error("Failed to save image");
    }
    const json = await response.json();
    return json["image_path"];
}

async function convertImageToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result); // This is the base64 string
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}

function setCookie(name,value,daysToExpire) {
    var expires = "";
    if(daysToExpire) {
        var date = new Date();
        date.setTime(date.getTime() + (daysToExpire*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while(c.charAt(0) === ' ') c = c.substring(1,c.length);
        if(c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
    }
    return null;

}

async function logAction(action, data) {

    // console.log("Action: " + action);
    // console.log(data);

    // Send data to server
    const response = await fetch("/log_action", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({action: action, data: data})
    });
    if(!response.ok) {
        throw new Error("Failed to log action");
    }
    const json = await response.json();
    console.log(json["message"]);
}

function timeToSeconds(time) {
    // time is in the format HH:MM:SS,MILISECONDS, e.g., 00:00:53,531
    let timeArray = time.split(":");
    let hours = parseInt(timeArray[0]);
    let minutes = parseInt(timeArray[1]);
    let seconds = parseInt(timeArray[2].split(",")[0]);
    let milliseconds = parseInt(timeArray[2].split(",")[1]);

    return hours*3600 + minutes*60 + seconds + milliseconds/1000;
}

function seekTo(time, videoPlayer) {
    videoPlayer.currentTime = timeToSeconds(time);
    videoPlayer.play();
}

function focusOnFeedback(feedback) {
    let dialogue_id = parseInt(feedback.dialogue_id);
    let quoteElement = document.getElementById(dialogue_id);
    if(quoteElement) {
        quoteElement.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
    } else {
        console.log("Error: Can't focus on feedback. Corresponding transcript excerpt not found.");
    }
}

function focusOnFeedbackNote(feedback) {
    let id = feedback.id;
    let noteElement = document.getElementById("feedback-note-section-"+id);
    if(noteElement) {
        noteElement.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
    } else {
        console.log("Error: Can't focus on feedback note. Corresponding note section not found.");
    }
}

function copy(text) {
    copyToClipboard(text);
}

/* src/components/LoadingBar.svelte generated by Svelte v3.59.2 */

const file$n = "src/components/LoadingBar.svelte";

function create_fragment$r(ctx) {
	let div2;
	let span;
	let t0;
	let t1;
	let t2;
	let t3;
	let t4;
	let div1;
	let div0;

	const block = {
		c: function create() {
			div2 = element("div");
			span = element("span");
			t0 = text("[");
			t1 = text(/*progress*/ ctx[0]);
			t2 = text("%] ");
			t3 = text(/*status*/ ctx[1]);
			t4 = space();
			div1 = element("div");
			div0 = element("div");
			attr_dev(span, "class", "status-text svelte-e99ivy");
			add_location(span, file$n, 45, 4, 1084);
			attr_dev(div0, "class", "loading-bar-progress svelte-e99ivy");
			set_style(div0, "width", /*progress*/ ctx[0] + "%");
			add_location(div0, file$n, 47, 8, 1190);
			attr_dev(div1, "class", "loading-bar-container svelte-e99ivy");
			add_location(div1, file$n, 46, 4, 1146);
			attr_dev(div2, "class", "container column centered spaced svelte-e99ivy");
			add_location(div2, file$n, 44, 0, 1033);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div2, anchor);
			append_dev(div2, span);
			append_dev(span, t0);
			append_dev(span, t1);
			append_dev(span, t2);
			append_dev(span, t3);
			append_dev(div2, t4);
			append_dev(div2, div1);
			append_dev(div1, div0);
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*progress*/ 1) set_data_dev(t1, /*progress*/ ctx[0]);
			if (dirty & /*status*/ 2) set_data_dev(t3, /*status*/ ctx[1]);

			if (dirty & /*progress*/ 1) {
				set_style(div0, "width", /*progress*/ ctx[0] + "%");
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div2);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$r.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$r($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('LoadingBar', slots, []);
	let { progress = 0 } = $$props;
	let { status = '' } = $$props;
	const writable_props = ['progress', 'status'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<LoadingBar> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('progress' in $$props) $$invalidate(0, progress = $$props.progress);
		if ('status' in $$props) $$invalidate(1, status = $$props.status);
	};

	$$self.$capture_state = () => ({ progress, status });

	$$self.$inject_state = $$props => {
		if ('progress' in $$props) $$invalidate(0, progress = $$props.progress);
		if ('status' in $$props) $$invalidate(1, status = $$props.status);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [progress, status];
}

class LoadingBar extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$r, create_fragment$r, safe_not_equal, { progress: 0, status: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "LoadingBar",
			options,
			id: create_fragment$r.name
		});
	}

	get progress() {
		throw new Error("<LoadingBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set progress(value) {
		throw new Error("<LoadingBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get status() {
		throw new Error("<LoadingBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set status(value) {
		throw new Error("<LoadingBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

async function saveRecording(recording) {

    const response = await fetch('/save_recording', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({recording:recording})
    });
    if(!response.ok) {
        throw new Error('Failed to save recording');
    }

    let response_json = await response.json();
    if("message" in response_json) {
        console.log(response_json["message"]);
    }
    return response_json["message"];
}


async function saveFeedbackList(feedback_list) {
    const response = await fetch("/save_feedback_list", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({feedback_list: feedback_list})
    });
    if(!response.ok) {
        throw new Error("Failed to save feedback list");
    }

    let response_json = await response.json();
    if("message" in response_json) {
        console.log(response_json["message"]);
    }

    return response_json["message"];
}

async function saveDisplayChatbotMessages(display_chatbot_messages) {
    const response = await fetch("/save_display_chatbot_messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({display_chatbot_messages: display_chatbot_messages})
    });
    if(!response.ok) {
        throw new Error("Failed to save display chatbot messages");
    }

    let response_json = await response.json();
    if("message" in response_json) {
        console.log(response_json["message"]);
    }

    return response_json["message"];
}

async function saveMyNotes(my_notes) {
    const response = await fetch("/save_my_notes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({my_notes: my_notes})
    });
    if(!response.ok) {
        throw new Error("Failed to save my notes");
    }

    let response_json = await response.json();
    if("message" in response_json) {
        console.log(response_json["message"]);
    }

    return response_json["message"];
}

async function saveMyFeedbackNotes(feedback_notes) {
    const response = await fetch("/save_feedback_notes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({feedback_notes: feedback_notes})
    });
    if(!response.ok) {
        throw new Error("Failed to save my feedback notes");
    }

    let response_json = await response.json();
    if("message" in response_json) {
        console.log(response_json["message"]);
    }

    return response_json["message"];
}

/* src/components/FeedbackSelector.svelte generated by Svelte v3.59.2 */

const { Error: Error_1$2, Object: Object_1$2, console: console_1$1 } = globals;
const file$m = "src/components/FeedbackSelector.svelte";

function get_each_context$2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[64] = list[i][0];
	child_ctx[65] = list[i][1];
	return child_ctx;
}

function get_each_context_1$2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[68] = list[i];
	child_ctx[70] = i;
	return child_ctx;
}

// (829:16) {:else}
function create_else_block_2$2(ctx) {
	let span;

	const block = {
		c: function create() {
			span = element("span");
			span.textContent = "No feedback moments highlighted.";
			add_location(span, file$m, 829, 20, 31043);
		},
		m: function mount(target, anchor) {
			insert_dev(target, span, anchor);
		},
		p: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(span);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_2$2.name,
		type: "else",
		source: "(829:16) {:else}",
		ctx
	});

	return block;
}

// (827:16) {#if feedback_list && feedback_list.length > 0}
function create_if_block_8$1(ctx) {
	let span;
	let t0_value = /*feedback_idx*/ ctx[2] + 1 + "";
	let t0;
	let t1;
	let t2_value = /*feedback_list*/ ctx[1].length + "";
	let t2;
	let t3;

	const block = {
		c: function create() {
			span = element("span");
			t0 = text(t0_value);
			t1 = text(" / ");
			t2 = text(t2_value);
			t3 = text(" feedback moments highlighted");
			add_location(span, file$m, 827, 20, 30913);
		},
		m: function mount(target, anchor) {
			insert_dev(target, span, anchor);
			append_dev(span, t0);
			append_dev(span, t1);
			append_dev(span, t2);
			append_dev(span, t3);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*feedback_idx*/ 4 && t0_value !== (t0_value = /*feedback_idx*/ ctx[2] + 1 + "")) set_data_dev(t0, t0_value);
			if (dirty[0] & /*feedback_list*/ 2 && t2_value !== (t2_value = /*feedback_list*/ ctx[1].length + "")) set_data_dev(t2, t2_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(span);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_8$1.name,
		type: "if",
		source: "(827:16) {#if feedback_list && feedback_list.length > 0}",
		ctx
	});

	return block;
}

// (876:12) {:else}
function create_else_block_1$2(ctx) {
	let div;
	let span;

	const block = {
		c: function create() {
			div = element("div");
			span = element("span");
			span.textContent = "No discussion transcript loaded. Please first upload your transcript.";
			add_location(span, file$m, 878, 20, 34011);
			attr_dev(div, "class", "centered");
			set_style(div, "height", "100%");
			set_style(div, "width", "100%");
			add_location(div, file$m, 876, 16, 33809);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, span);
		},
		p: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_1$2.name,
		type: "else",
		source: "(876:12) {:else}",
		ctx
	});

	return block;
}

// (855:12) {#if recording && recording.transcript_list && recording.transcript_list.length > 0}
function create_if_block_7$1(ctx) {
	let p;
	let each_value_1 = /*recording*/ ctx[0].transcript_list;
	validate_each_argument(each_value_1);
	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1$2(get_each_context_1$2(ctx, each_value_1, i));
	}

	const block = {
		c: function create() {
			p = element("p");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr_dev(p, "class", "padded");
			add_location(p, file$m, 855, 16, 32587);
		},
		m: function mount(target, anchor) {
			insert_dev(target, p, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(p, null);
				}
			}
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*recording, mediaPlayer*/ 9) {
				each_value_1 = /*recording*/ ctx[0].transcript_list;
				validate_each_argument(each_value_1);
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1$2(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_1$2(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(p, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_1.length;
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(p);
			destroy_each(each_blocks, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_7$1.name,
		type: "if",
		source: "(855:12) {#if recording && recording.transcript_list && recording.transcript_list.length > 0}",
		ctx
	});

	return block;
}

// (857:20) {#each recording.transcript_list as excerpt, i}
function create_each_block_1$2(ctx) {
	let div;
	let span0;
	let t0;
	let t1_value = /*excerpt*/ ctx[68].start_timestamp + "";
	let t1;
	let t2;
	let t3;
	let span1;
	let t4;
	let t5_value = /*excerpt*/ ctx[68].end_timestamp + "";
	let t5;
	let t6;
	let t7;
	let br0;
	let t8;

	let t9_value = (/*excerpt*/ ctx[68].speaker
	? /*excerpt*/ ctx[68].speaker + ":"
	: "") + "";

	let t9;
	let t10;
	let span2;
	let raw_value = /*excerpt*/ ctx[68].dialogue + "";
	let span2_id_value;
	let t11;
	let br1;
	let br2;
	let t12;
	let mounted;
	let dispose;

	function click_handler_2() {
		return /*click_handler_2*/ ctx[22](/*excerpt*/ ctx[68]);
	}

	function click_handler_3() {
		return /*click_handler_3*/ ctx[23](/*excerpt*/ ctx[68]);
	}

	const block = {
		c: function create() {
			div = element("div");
			span0 = element("span");
			t0 = text("[");
			t1 = text(t1_value);
			t2 = text("]");
			t3 = text(" \n                            - \n                            ");
			span1 = element("span");
			t4 = text("[");
			t5 = text(t5_value);
			t6 = text("]");
			t7 = space();
			br0 = element("br");
			t8 = space();
			t9 = text(t9_value);
			t10 = space();
			span2 = element("span");
			t11 = space();
			br1 = element("br");
			br2 = element("br");
			t12 = space();
			attr_dev(span0, "class", "timestamp svelte-axxzkr");
			add_location(span0, file$m, 858, 28, 32748);
			attr_dev(span1, "class", "timestamp svelte-axxzkr");
			add_location(span1, file$m, 863, 28, 33122);
			add_location(br0, file$m, 867, 28, 33455);
			attr_dev(span2, "id", span2_id_value = /*excerpt*/ ctx[68].id);
			attr_dev(span2, "class", "svelte-axxzkr");
			add_location(span2, file$m, 869, 28, 33563);
			add_location(br1, file$m, 871, 36, 33680);
			add_location(br2, file$m, 871, 40, 33684);
			attr_dev(div, "class", "spaced");
			add_location(div, file$m, 857, 24, 32699);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, span0);
			append_dev(span0, t0);
			append_dev(span0, t1);
			append_dev(span0, t2);
			append_dev(div, t3);
			append_dev(div, span1);
			append_dev(span1, t4);
			append_dev(span1, t5);
			append_dev(span1, t6);
			append_dev(div, t7);
			append_dev(div, br0);
			append_dev(div, t8);
			append_dev(div, t9);
			append_dev(div, t10);
			append_dev(div, span2);
			span2.innerHTML = raw_value;
			append_dev(div, t11);
			append_dev(div, br1);
			append_dev(div, br2);
			append_dev(div, t12);

			if (!mounted) {
				dispose = [
					listen_dev(span0, "click", click_handler_2, false, false, false, false),
					listen_dev(span1, "click", click_handler_3, false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty[0] & /*recording*/ 1 && t1_value !== (t1_value = /*excerpt*/ ctx[68].start_timestamp + "")) set_data_dev(t1, t1_value);
			if (dirty[0] & /*recording*/ 1 && t5_value !== (t5_value = /*excerpt*/ ctx[68].end_timestamp + "")) set_data_dev(t5, t5_value);

			if (dirty[0] & /*recording*/ 1 && t9_value !== (t9_value = (/*excerpt*/ ctx[68].speaker
			? /*excerpt*/ ctx[68].speaker + ":"
			: "") + "")) set_data_dev(t9, t9_value);

			if (dirty[0] & /*recording*/ 1 && raw_value !== (raw_value = /*excerpt*/ ctx[68].dialogue + "")) span2.innerHTML = raw_value;
			if (dirty[0] & /*recording*/ 1 && span2_id_value !== (span2_id_value = /*excerpt*/ ctx[68].id)) {
				attr_dev(span2, "id", span2_id_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_1$2.name,
		type: "each",
		source: "(857:20) {#each recording.transcript_list as excerpt, i}",
		ctx
	});

	return block;
}

// (979:32) {#if recording.video || recording.audio}
function create_if_block_6$1(ctx) {
	let button;
	let img;
	let img_src_value;
	let t;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			button = element("button");
			img = element("img");
			t = text("\n                                        Remove media");
			if (!src_url_equal(img.src, img_src_value = "./logos/delete-x-svgrepo-com.svg")) attr_dev(img, "src", img_src_value);
			attr_dev(img, "alt", "Delete media");
			attr_dev(img, "class", "mini-icon");
			add_location(img, file$m, 999, 40, 42444);
			attr_dev(button, "class", "action-button centered row  svelte-axxzkr");
			button.disabled = /*is_loading*/ ctx[8];
			add_location(button, file$m, 979, 36, 41049);
		},
		m: function mount(target, anchor) {
			insert_dev(target, button, anchor);
			append_dev(button, img);
			append_dev(button, t);

			if (!mounted) {
				dispose = listen_dev(button, "click", /*click_handler_5*/ ctx[28], false, false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*is_loading*/ 256) {
				prop_dev(button, "disabled", /*is_loading*/ ctx[8]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(button);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_6$1.name,
		type: "if",
		source: "(979:32) {#if recording.video || recording.audio}",
		ctx
	});

	return block;
}

// (1028:32) {#if recording.transcript_list && recording.transcript_list.length > 0}
function create_if_block_5$3(ctx) {
	let button;
	let img;
	let img_src_value;
	let t;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			button = element("button");
			img = element("img");
			t = text("\n                                        Remove transcript");
			if (!src_url_equal(img.src, img_src_value = "./logos/delete-x-svgrepo-com.svg")) attr_dev(img, "src", img_src_value);
			attr_dev(img, "alt", "Delete transcript");
			attr_dev(img, "class", "mini-icon");
			add_location(img, file$m, 1041, 40, 45468);
			attr_dev(button, "class", "action-button centered row  svelte-axxzkr");
			button.disabled = /*is_loading*/ ctx[8];
			add_location(button, file$m, 1028, 36, 44518);
		},
		m: function mount(target, anchor) {
			insert_dev(target, button, anchor);
			append_dev(button, img);
			append_dev(button, t);

			if (!mounted) {
				dispose = listen_dev(button, "click", /*click_handler_7*/ ctx[33], false, false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*is_loading*/ 256) {
				prop_dev(button, "disabled", /*is_loading*/ ctx[8]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(button);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_5$3.name,
		type: "if",
		source: "(1028:32) {#if recording.transcript_list && recording.transcript_list.length > 0}",
		ctx
	});

	return block;
}

// (1171:12) {:else}
function create_else_block$5(ctx) {
	let video;
	let track;
	let track_src_value;
	let video_src_value;

	const block = {
		c: function create() {
			video = element("video");
			track = element("track");
			attr_dev(track, "kind", "captions");
			if (!src_url_equal(track.src, track_src_value = "blank.vtt")) attr_dev(track, "src", track_src_value);
			attr_dev(track, "srclang", "en");
			add_location(track, file$m, 1172, 20, 53592);
			if (!src_url_equal(video.src, video_src_value = "video.mp4")) attr_dev(video, "src", video_src_value);
			video.controls = true;
			set_style(video, "width", "100%");
			set_style(video, "height", "100%");
			add_location(video, file$m, 1171, 16, 53480);
		},
		m: function mount(target, anchor) {
			insert_dev(target, video, anchor);
			append_dev(video, track);
			/*video_binding_1*/ ctx[41](video);
		},
		p: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(video);
			/*video_binding_1*/ ctx[41](null);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block$5.name,
		type: "else",
		source: "(1171:12) {:else}",
		ctx
	});

	return block;
}

// (1169:51) 
function create_if_block_4$3(ctx) {
	let audio;
	let audio_src_value;

	const block = {
		c: function create() {
			audio = element("audio");
			if (!src_url_equal(audio.src, audio_src_value = /*recording*/ ctx[0].audio)) attr_dev(audio, "src", audio_src_value);
			audio.controls = true;
			set_style(audio, "width", "100%");
			set_style(audio, "height", "100%");
			add_location(audio, file$m, 1169, 16, 53338);
		},
		m: function mount(target, anchor) {
			insert_dev(target, audio, anchor);
			/*audio_binding*/ ctx[40](audio);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*recording*/ 1 && !src_url_equal(audio.src, audio_src_value = /*recording*/ ctx[0].audio)) {
				attr_dev(audio, "src", audio_src_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(audio);
			/*audio_binding*/ ctx[40](null);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_4$3.name,
		type: "if",
		source: "(1169:51) ",
		ctx
	});

	return block;
}

// (1165:12) {#if recording && recording.video}
function create_if_block_3$3(ctx) {
	let video;
	let track;
	let track_src_value;
	let video_src_value;

	const block = {
		c: function create() {
			video = element("video");
			track = element("track");
			attr_dev(track, "kind", "captions");
			if (!src_url_equal(track.src, track_src_value = "blank.vtt")) attr_dev(track, "src", track_src_value);
			attr_dev(track, "srclang", "en");
			add_location(track, file$m, 1166, 20, 53192);
			if (!src_url_equal(video.src, video_src_value = /*recording*/ ctx[0].video)) attr_dev(video, "src", video_src_value);
			video.controls = true;
			set_style(video, "width", "100%");
			set_style(video, "height", "100%");
			add_location(video, file$m, 1165, 16, 53074);
		},
		m: function mount(target, anchor) {
			insert_dev(target, video, anchor);
			append_dev(video, track);
			/*video_binding*/ ctx[39](video);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*recording*/ 1 && !src_url_equal(video.src, video_src_value = /*recording*/ ctx[0].video)) {
				attr_dev(video, "src", video_src_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(video);
			/*video_binding*/ ctx[39](null);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_3$3.name,
		type: "if",
		source: "(1165:12) {#if recording && recording.video}",
		ctx
	});

	return block;
}

// (1179:12) {#if recording && recording.transcript_list}
function create_if_block$6(ctx) {
	let t;
	let if_block1_anchor;
	let if_block0 = /*recording*/ ctx[0].transcript_list && /*recording*/ ctx[0].transcript_list.length > 0 && "speaker" in /*recording*/ ctx[0].transcript_list[0] && create_if_block_2$4(ctx);
	let if_block1 = /*feedback_list*/ ctx[1] && create_if_block_1$4(ctx);

	const block = {
		c: function create() {
			if (if_block0) if_block0.c();
			t = space();
			if (if_block1) if_block1.c();
			if_block1_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (if_block0) if_block0.m(target, anchor);
			insert_dev(target, t, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert_dev(target, if_block1_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (/*recording*/ ctx[0].transcript_list && /*recording*/ ctx[0].transcript_list.length > 0 && "speaker" in /*recording*/ ctx[0].transcript_list[0]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_2$4(ctx);
					if_block0.c();
					if_block0.m(t.parentNode, t);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (/*feedback_list*/ ctx[1]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_1$4(ctx);
					if_block1.c();
					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}
		},
		d: function destroy(detaching) {
			if (if_block0) if_block0.d(detaching);
			if (detaching) detach_dev(t);
			if (if_block1) if_block1.d(detaching);
			if (detaching) detach_dev(if_block1_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$6.name,
		type: "if",
		source: "(1179:12) {#if recording && recording.transcript_list}",
		ctx
	});

	return block;
}

// (1180:16) {#if recording.transcript_list && recording.transcript_list.length > 0 &&  "speaker" in recording.transcript_list[0]}
function create_if_block_2$4(ctx) {
	let strong;
	let t0;
	let t1_value = Object.keys(/*recording*/ ctx[0].transcript_list.reduce(func$1, {})).length + "";
	let t1;
	let t2;
	let br0;
	let t3;
	let ul;
	let t4;
	let br1;
	let each_value = Object.entries(/*recording*/ ctx[0].transcript_list.reduce(func_1, {}));
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			strong = element("strong");
			t0 = text("Number of participants: ");
			t1 = text(t1_value);
			t2 = space();
			br0 = element("br");
			t3 = space();
			ul = element("ul");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t4 = space();
			br1 = element("br");
			add_location(strong, file$m, 1180, 20, 54120);
			add_location(br0, file$m, 1183, 45, 54345);
			add_location(ul, file$m, 1184, 20, 54370);
			add_location(br1, file$m, 1193, 20, 54832);
		},
		m: function mount(target, anchor) {
			insert_dev(target, strong, anchor);
			append_dev(strong, t0);
			append_dev(strong, t1);
			insert_dev(target, t2, anchor);
			insert_dev(target, br0, anchor);
			insert_dev(target, t3, anchor);
			insert_dev(target, ul, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(ul, null);
				}
			}

			insert_dev(target, t4, anchor);
			insert_dev(target, br1, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*recording*/ 1 && t1_value !== (t1_value = Object.keys(/*recording*/ ctx[0].transcript_list.reduce(func$1, {})).length + "")) set_data_dev(t1, t1_value);

			if (dirty[0] & /*recording*/ 1) {
				each_value = Object.entries(/*recording*/ ctx[0].transcript_list.reduce(func_1, {}));
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$2(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$2(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(ul, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(strong);
			if (detaching) detach_dev(t2);
			if (detaching) detach_dev(br0);
			if (detaching) detach_dev(t3);
			if (detaching) detach_dev(ul);
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(t4);
			if (detaching) detach_dev(br1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2$4.name,
		type: "if",
		source: "(1180:16) {#if recording.transcript_list && recording.transcript_list.length > 0 &&  \\\"speaker\\\" in recording.transcript_list[0]}",
		ctx
	});

	return block;
}

// (1186:24) {#each Object.entries(recording.transcript_list.reduce((acc, cur) => {                             acc[cur.speaker] = (acc[cur.speaker] || 0) + 1;                             return acc;                         }, {})) as [pa, count]}
function create_each_block$2(ctx) {
	let li;
	let t0;
	let t1_value = /*pa*/ ctx[64] + "";
	let t1;
	let t2;
	let t3_value = /*count*/ ctx[65] + "";
	let t3;
	let t4;
	let t5;

	const block = {
		c: function create() {
			li = element("li");
			t0 = text("- ");
			t1 = text(t1_value);
			t2 = text(": ");
			t3 = text(t3_value);
			t4 = text(" utterances");
			t5 = space();
			add_location(li, file$m, 1189, 28, 54662);
		},
		m: function mount(target, anchor) {
			insert_dev(target, li, anchor);
			append_dev(li, t0);
			append_dev(li, t1);
			append_dev(li, t2);
			append_dev(li, t3);
			append_dev(li, t4);
			insert_dev(target, t5, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*recording*/ 1 && t1_value !== (t1_value = /*pa*/ ctx[64] + "")) set_data_dev(t1, t1_value);
			if (dirty[0] & /*recording*/ 1 && t3_value !== (t3_value = /*count*/ ctx[65] + "")) set_data_dev(t3, t3_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(li);
			if (detaching) detach_dev(t5);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$2.name,
		type: "each",
		source: "(1186:24) {#each Object.entries(recording.transcript_list.reduce((acc, cur) => {                             acc[cur.speaker] = (acc[cur.speaker] || 0) + 1;                             return acc;                         }, {})) as [pa, count]}",
		ctx
	});

	return block;
}

// (1198:16) {#if feedback_list}
function create_if_block_1$4(ctx) {
	let strong;
	let t0;
	let t1_value = /*feedback_list*/ ctx[1].length + "";
	let t1;
	let t2;
	let ul;
	let li0;
	let t3;
	let t4_value = /*feedback_list*/ ctx[1].filter(func_2).length + "";
	let t4;
	let t5;
	let li1;
	let t6;
	let t7_value = /*feedback_list*/ ctx[1].filter(func_3).length + "";
	let t7;

	const block = {
		c: function create() {
			strong = element("strong");
			t0 = text("Number of feedback utterances: ");
			t1 = text(t1_value);
			t2 = space();
			ul = element("ul");
			li0 = element("li");
			t3 = text("- Number of positive feedback: ");
			t4 = text(t4_value);
			t5 = space();
			li1 = element("li");
			t6 = text("- Number of critical feedback: ");
			t7 = text(t7_value);
			add_location(strong, file$m, 1198, 20, 54949);
			add_location(li0, file$m, 1200, 24, 55071);
			add_location(li1, file$m, 1201, 24, 55208);
			add_location(ul, file$m, 1199, 20, 55042);
		},
		m: function mount(target, anchor) {
			insert_dev(target, strong, anchor);
			append_dev(strong, t0);
			append_dev(strong, t1);
			insert_dev(target, t2, anchor);
			insert_dev(target, ul, anchor);
			append_dev(ul, li0);
			append_dev(li0, t3);
			append_dev(li0, t4);
			append_dev(ul, t5);
			append_dev(ul, li1);
			append_dev(li1, t6);
			append_dev(li1, t7);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*feedback_list*/ 2 && t1_value !== (t1_value = /*feedback_list*/ ctx[1].length + "")) set_data_dev(t1, t1_value);
			if (dirty[0] & /*feedback_list*/ 2 && t4_value !== (t4_value = /*feedback_list*/ ctx[1].filter(func_2).length + "")) set_data_dev(t4, t4_value);
			if (dirty[0] & /*feedback_list*/ 2 && t7_value !== (t7_value = /*feedback_list*/ ctx[1].filter(func_3).length + "")) set_data_dev(t7, t7_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(strong);
			if (detaching) detach_dev(t2);
			if (detaching) detach_dev(ul);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$4.name,
		type: "if",
		source: "(1198:16) {#if feedback_list}",
		ctx
	});

	return block;
}

function create_fragment$q(ctx) {
	let div18;
	let div14;
	let div2;
	let div0;
	let loadingbar;
	let updating_progress;
	let updating_status;
	let t0;
	let div1;
	let t1;
	let button0;
	let img0;
	let img0_src_value;
	let button0_disabled_value;
	let t2;
	let button1;
	let img1;
	let img1_src_value;
	let button1_disabled_value;
	let t3;
	let t4;
	let div13;
	let div9;
	let span0;
	let t6;
	let div8;
	let div7;
	let div4;
	let label0;
	let t8;
	let div3;
	let input0;
	let t9;
	let button2;
	let img2;
	let img2_src_value;
	let t10;
	let button2_disabled_value;
	let t11;
	let t12;
	let div6;
	let label1;
	let t14;
	let div5;
	let input1;
	let t15;
	let button3;
	let img3;
	let img3_src_value;
	let t16;
	let button3_disabled_value;
	let t17;
	let t18;
	let div12;
	let span1;
	let t20;
	let div11;
	let div10;
	let button4;
	let img4;
	let img4_src_value;
	let t21;
	let br0;
	let t22;
	let button4_disabled_value;
	let t23;
	let button5;
	let img5;
	let img5_src_value;
	let t24;
	let br1;
	let t25;
	let button5_disabled_value;
	let t26;
	let button6;
	let img6;
	let img6_src_value;
	let t27;
	let br2;
	let t28;
	let button6_disabled_value;
	let t29;
	let button7;
	let img7;
	let img7_src_value;
	let t30;
	let br3;
	let t31;
	let button7_disabled_value;
	let t32;
	let button8;
	let img8;
	let img8_src_value;
	let t33;
	let br4;
	let t34;
	let button8_disabled_value;
	let t35;
	let div17;
	let div15;
	let t36;
	let div16;
	let h3;
	let t38;
	let current;
	let mounted;
	let dispose;

	function loadingbar_progress_binding(value) {
		/*loadingbar_progress_binding*/ ctx[18](value);
	}

	function loadingbar_status_binding(value) {
		/*loadingbar_status_binding*/ ctx[19](value);
	}

	let loadingbar_props = {};

	if (/*progress*/ ctx[10] !== void 0) {
		loadingbar_props.progress = /*progress*/ ctx[10];
	}

	if (/*load_status*/ ctx[9] !== void 0) {
		loadingbar_props.status = /*load_status*/ ctx[9];
	}

	loadingbar = new LoadingBar({ props: loadingbar_props, $$inline: true });
	binding_callbacks.push(() => bind(loadingbar, 'progress', loadingbar_progress_binding));
	binding_callbacks.push(() => bind(loadingbar, 'status', loadingbar_status_binding));

	function select_block_type(ctx, dirty) {
		if (/*feedback_list*/ ctx[1] && /*feedback_list*/ ctx[1].length > 0) return create_if_block_8$1;
		return create_else_block_2$2;
	}

	let current_block_type = select_block_type(ctx);
	let if_block0 = current_block_type(ctx);

	function select_block_type_1(ctx, dirty) {
		if (/*recording*/ ctx[0] && /*recording*/ ctx[0].transcript_list && /*recording*/ ctx[0].transcript_list.length > 0) return create_if_block_7$1;
		return create_else_block_1$2;
	}

	let current_block_type_1 = select_block_type_1(ctx);
	let if_block1 = current_block_type_1(ctx);
	let if_block2 = (/*recording*/ ctx[0].video || /*recording*/ ctx[0].audio) && create_if_block_6$1(ctx);
	let if_block3 = /*recording*/ ctx[0].transcript_list && /*recording*/ ctx[0].transcript_list.length > 0 && create_if_block_5$3(ctx);

	function select_block_type_2(ctx, dirty) {
		if (/*recording*/ ctx[0] && /*recording*/ ctx[0].video) return create_if_block_3$3;
		if (/*recording*/ ctx[0] && /*recording*/ ctx[0].audio) return create_if_block_4$3;
		return create_else_block$5;
	}

	let current_block_type_2 = select_block_type_2(ctx);
	let if_block4 = current_block_type_2(ctx);
	let if_block5 = /*recording*/ ctx[0] && /*recording*/ ctx[0].transcript_list && create_if_block$6(ctx);

	const block = {
		c: function create() {
			div18 = element("div");
			div14 = element("div");
			div2 = element("div");
			div0 = element("div");
			create_component(loadingbar.$$.fragment);
			t0 = space();
			div1 = element("div");
			if_block0.c();
			t1 = space();
			button0 = element("button");
			img0 = element("img");
			t2 = space();
			button1 = element("button");
			img1 = element("img");
			t3 = space();
			if_block1.c();
			t4 = space();
			div13 = element("div");
			div9 = element("div");
			span0 = element("span");
			span0.textContent = "Step 1: Upload your discussion.";
			t6 = space();
			div8 = element("div");
			div7 = element("div");
			div4 = element("div");
			label0 = element("label");
			label0.textContent = "Upload your own video or audio:";
			t8 = space();
			div3 = element("div");
			input0 = element("input");
			t9 = space();
			button2 = element("button");
			img2 = element("img");
			t10 = text("\n                                    Upload file");
			t11 = space();
			if (if_block2) if_block2.c();
			t12 = space();
			div6 = element("div");
			label1 = element("label");
			label1.textContent = "Upload your own transcript (in .srt only):";
			t14 = space();
			div5 = element("div");
			input1 = element("input");
			t15 = space();
			button3 = element("button");
			img3 = element("img");
			t16 = text("\n                                    Upload file");
			t17 = space();
			if (if_block3) if_block3.c();
			t18 = space();
			div12 = element("div");
			span1 = element("span");
			span1.textContent = "Step 2: Highlight feedback in the discussion's transcript.";
			t20 = space();
			div11 = element("div");
			div10 = element("div");
			button4 = element("button");
			img4 = element("img");
			t21 = text("\n                            Auto-detect ");
			br0 = element("br");
			t22 = text(" Feedback");
			t23 = space();
			button5 = element("button");
			img5 = element("img");
			t24 = text("\n                            Highlight ");
			br1 = element("br");
			t25 = text(" Positive");
			t26 = space();
			button6 = element("button");
			img6 = element("img");
			t27 = text("\n                            Highlight ");
			br2 = element("br");
			t28 = text(" Critical");
			t29 = space();
			button7 = element("button");
			img7 = element("img");
			t30 = text("\n                            Remove ");
			br3 = element("br");
			t31 = text(" Feedback");
			t32 = space();
			button8 = element("button");
			img8 = element("img");
			t33 = text("\n                            Remove all ");
			br4 = element("br");
			t34 = text(" Feedback");
			t35 = space();
			div17 = element("div");
			div15 = element("div");
			if_block4.c();
			t36 = space();
			div16 = element("div");
			h3 = element("h3");
			h3.textContent = "Discussion Transcript Details";
			t38 = space();
			if (if_block5) if_block5.c();
			attr_dev(div0, "class", "overlay centered padded");
			toggle_class(div0, "invisible", /*is_loading*/ ctx[8] === false);
			add_location(div0, file$m, 821, 12, 30576);
			if (!src_url_equal(img0.src, img0_src_value = "./logos/up-arrow-5-svgrepo-com.svg")) attr_dev(img0, "src", img0_src_value);
			attr_dev(img0, "alt", "Prev feedback");
			attr_dev(img0, "class", "logo");
			set_style(img0, "width", "1.5rem");
			set_style(img0, "height", "1.5rem");
			add_location(img0, file$m, 840, 20, 31639);
			button0.disabled = button0_disabled_value = !/*feedback_list*/ ctx[1] || /*feedback_list*/ ctx[1].length <= 0;
			add_location(button0, file$m, 831, 16, 31129);
			if (!src_url_equal(img1.src, img1_src_value = "./logos/down-arrow-5-svgrepo-com.svg")) attr_dev(img1, "src", img1_src_value);
			attr_dev(img1, "alt", "Next feedback");
			attr_dev(img1, "class", "logo");
			set_style(img1, "width", "1.5rem");
			set_style(img1, "height", "1.5rem");
			add_location(img1, file$m, 851, 20, 32306);
			button1.disabled = button1_disabled_value = !/*feedback_list*/ ctx[1] || /*feedback_list*/ ctx[1].length <= 0;
			add_location(button1, file$m, 842, 16, 31800);
			attr_dev(div1, "id", "traverse-feedback-area");
			attr_dev(div1, "class", "bordered spaced svelte-axxzkr");
			add_location(div1, file$m, 825, 12, 30770);
			attr_dev(div2, "id", "transcript-area");
			attr_dev(div2, "class", "column bordered spaced svelte-axxzkr");
			add_location(div2, file$m, 819, 8, 30505);
			set_style(span0, "font-weight", "bold");
			set_style(span0, "text-decoration", "underline");
			set_style(span0, "margin-left", "1rem");
			add_location(span0, file$m, 885, 16, 34349);
			attr_dev(label0, "for", "file_upload");
			add_location(label0, file$m, 941, 28, 38260);
			set_style(input0, "width", "50%");
			attr_dev(input0, "name", "mediafile_upload");
			attr_dev(input0, "type", "file");
			attr_dev(input0, "id", "mediafile_upload");
			attr_dev(input0, "accept", "video/*, audio/*");
			add_location(input0, file$m, 943, 32, 38421);
			if (!src_url_equal(img2.src, img2_src_value = "./logos/upload-svgrepo-com.svg")) attr_dev(img2, "src", img2_src_value);
			attr_dev(img2, "alt", "Upload file");
			attr_dev(img2, "class", "mini-icon");
			add_location(img2, file$m, 974, 36, 40736);
			attr_dev(button2, "class", "action-button centered column  svelte-axxzkr");
			button2.disabled = button2_disabled_value = /*is_loading*/ ctx[8] || !/*media_files*/ ctx[4] || /*media_files*/ ctx[4].length === 0;
			add_location(button2, file$m, 965, 32, 40066);
			attr_dev(div3, "class", "row centered spaced");
			add_location(div3, file$m, 942, 28, 38355);
			attr_dev(div4, "class", "column spaced centered");
			add_location(div4, file$m, 940, 24, 38195);
			attr_dev(label1, "for", "file_upload");
			add_location(label1, file$m, 1007, 28, 42820);
			set_style(input1, "width", "50%");
			attr_dev(input1, "name", "transcirptfile_upload");
			attr_dev(input1, "type", "file");
			attr_dev(input1, "id", "transcriptfile_upload");
			attr_dev(input1, "accept", " .srt");
			add_location(input1, file$m, 1009, 32, 42992);
			if (!src_url_equal(img3.src, img3_src_value = "./logos/upload-svgrepo-com.svg")) attr_dev(img3, "src", img3_src_value);
			attr_dev(img3, "alt", "Upload file");
			attr_dev(img3, "class", "mini-icon");
			add_location(img3, file$m, 1024, 36, 44208);
			attr_dev(button3, "class", "action-button centered column  svelte-axxzkr");
			button3.disabled = button3_disabled_value = /*is_loading*/ ctx[8] || !/*transcript_files*/ ctx[6] || /*transcript_files*/ ctx[6].length === 0;
			add_location(button3, file$m, 1015, 32, 43526);
			attr_dev(div5, "class", "row centered spaced");
			add_location(div5, file$m, 1008, 28, 42926);
			attr_dev(div6, "class", "column spaced centered");
			add_location(div6, file$m, 1006, 24, 42755);
			attr_dev(div7, "class", "column centered spaced");
			add_location(div7, file$m, 939, 20, 38134);
			attr_dev(div8, "class", "row centered spaced");
			add_location(div8, file$m, 886, 16, 34485);
			attr_dev(div9, "id", "capture-feedback-panel");
			attr_dev(div9, "class", "column padded centered spaced svelte-axxzkr");
			add_location(div9, file$m, 884, 12, 34261);
			set_style(span1, "font-weight", "bold");
			set_style(span1, "text-decoration", "underline");
			set_style(span1, "margin-left", "1rem");
			add_location(span1, file$m, 1052, 16, 45953);
			if (!src_url_equal(img4.src, img4_src_value = "./logos/magnifying-glass-for-search-3-svgrepo-com.svg")) attr_dev(img4, "src", img4_src_value);
			attr_dev(img4, "alt", "Auto-detect Feedback");
			attr_dev(img4, "class", "logo");
			add_location(img4, file$m, 1104, 28, 49471);
			add_location(br0, file$m, 1105, 40, 49617);
			attr_dev(button4, "class", "action-button svelte-axxzkr");
			button4.disabled = button4_disabled_value = !/*recording*/ ctx[0] || !/*recording*/ ctx[0].transcript_list || /*is_loading*/ ctx[8];
			add_location(button4, file$m, 1055, 24, 46252);
			if (!src_url_equal(img5.src, img5_src_value = "./logos/highlight-green-svgrepo-com.svg")) attr_dev(img5, "src", img5_src_value);
			attr_dev(img5, "alt", "Highlight Positive Feedback");
			attr_dev(img5, "class", "logo");
			add_location(img5, file$m, 1116, 28, 50262);
			add_location(br1, file$m, 1117, 38, 50399);
			attr_dev(button5, "class", "action-button svelte-axxzkr");
			button5.disabled = button5_disabled_value = !/*recording*/ ctx[0] || !/*recording*/ ctx[0].transcript_list || /*is_loading*/ ctx[8];
			add_location(button5, file$m, 1107, 24, 49689);
			if (!src_url_equal(img6.src, img6_src_value = "./logos/highlight-red-svgrepo-com.svg")) attr_dev(img6, "src", img6_src_value);
			attr_dev(img6, "alt", "Highlight Critical Feedback");
			attr_dev(img6, "class", "logo");
			add_location(img6, file$m, 1128, 28, 51044);
			add_location(br2, file$m, 1129, 38, 51179);
			attr_dev(button6, "class", "action-button svelte-axxzkr");
			button6.disabled = button6_disabled_value = !/*recording*/ ctx[0] || !/*recording*/ ctx[0].transcript_list || /*is_loading*/ ctx[8];
			add_location(button6, file$m, 1119, 24, 50471);
			if (!src_url_equal(img7.src, img7_src_value = "./logos/erase-svgrepo-com.svg")) attr_dev(img7, "src", img7_src_value);
			attr_dev(img7, "alt", "De-highlight Feedback");
			attr_dev(img7, "class", "logo");
			add_location(img7, file$m, 1140, 28, 51841);
			add_location(br3, file$m, 1141, 35, 51959);
			attr_dev(button7, "class", "action-button svelte-axxzkr");
			button7.disabled = button7_disabled_value = !/*recording*/ ctx[0] || !/*recording*/ ctx[0].transcript_list || /*is_loading*/ ctx[8] || /*feedback_list*/ ctx[1].length <= 0;
			add_location(button7, file$m, 1131, 24, 51252);
			if (!src_url_equal(img8.src, img8_src_value = "./logos/delete-svgrepo-com.svg")) attr_dev(img8, "src", img8_src_value);
			attr_dev(img8, "alt", "Delete all Feedback");
			attr_dev(img8, "class", "logo");
			add_location(img8, file$m, 1152, 28, 52616);
			add_location(br4, file$m, 1153, 39, 52737);
			attr_dev(button8, "class", "action-button svelte-axxzkr");
			button8.disabled = button8_disabled_value = !/*recording*/ ctx[0] || !/*recording*/ ctx[0].transcript_list || /*is_loading*/ ctx[8] || /*feedback_list*/ ctx[1].length <= 0;
			add_location(button8, file$m, 1143, 24, 52031);
			attr_dev(div10, "class", "row centered spaced");
			add_location(div10, file$m, 1054, 20, 46194);
			attr_dev(div11, "class", "centered");
			set_style(div11, "height", "100%");
			set_style(div11, "width", "100%");
			add_location(div11, file$m, 1053, 16, 46116);
			attr_dev(div12, "id", "feedback-highlight-panel");
			attr_dev(div12, "class", "column spaced padded  svelte-axxzkr");
			add_location(div12, file$m, 1051, 12, 45870);
			attr_dev(div13, "id", "transcript-buttons-area");
			attr_dev(div13, "class", "row centered spaced bordered svelte-axxzkr");
			add_location(div13, file$m, 883, 8, 34177);
			attr_dev(div14, "id", "left-panel");
			attr_dev(div14, "class", "column spaced svelte-axxzkr");
			add_location(div14, file$m, 818, 4, 30452);
			attr_dev(div15, "id", "media-player-area");
			attr_dev(div15, "class", "bordered centered svelte-axxzkr");
			add_location(div15, file$m, 1163, 8, 52956);
			set_style(h3, "font-weight", "bold");
			set_style(h3, "text-decoration", "underline");
			add_location(h3, file$m, 1177, 12, 53812);
			attr_dev(div16, "id", "feedback-details-area");
			attr_dev(div16, "class", "bordered padded spaced svelte-axxzkr");
			set_style(div16, "overflow-y", "auto");
			add_location(div16, file$m, 1176, 8, 53711);
			attr_dev(div17, "id", "right-panel");
			attr_dev(div17, "class", "column spaced svelte-axxzkr");
			add_location(div17, file$m, 1162, 4, 52902);
			attr_dev(div18, "div", "");
			attr_dev(div18, "class", "row spaced svelte-axxzkr");
			attr_dev(div18, "id", "feedback-selector-page");
			add_location(div18, file$m, 817, 0, 30391);
		},
		l: function claim(nodes) {
			throw new Error_1$2("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div18, anchor);
			append_dev(div18, div14);
			append_dev(div14, div2);
			append_dev(div2, div0);
			mount_component(loadingbar, div0, null);
			append_dev(div2, t0);
			append_dev(div2, div1);
			if_block0.m(div1, null);
			append_dev(div1, t1);
			append_dev(div1, button0);
			append_dev(button0, img0);
			append_dev(div1, t2);
			append_dev(div1, button1);
			append_dev(button1, img1);
			append_dev(div2, t3);
			if_block1.m(div2, null);
			append_dev(div14, t4);
			append_dev(div14, div13);
			append_dev(div13, div9);
			append_dev(div9, span0);
			append_dev(div9, t6);
			append_dev(div9, div8);
			append_dev(div8, div7);
			append_dev(div7, div4);
			append_dev(div4, label0);
			append_dev(div4, t8);
			append_dev(div4, div3);
			append_dev(div3, input0);
			/*input0_binding*/ ctx[25](input0);
			append_dev(div3, t9);
			append_dev(div3, button2);
			append_dev(button2, img2);
			append_dev(button2, t10);
			append_dev(div3, t11);
			if (if_block2) if_block2.m(div3, null);
			append_dev(div7, t12);
			append_dev(div7, div6);
			append_dev(div6, label1);
			append_dev(div6, t14);
			append_dev(div6, div5);
			append_dev(div5, input1);
			/*input1_binding*/ ctx[30](input1);
			append_dev(div5, t15);
			append_dev(div5, button3);
			append_dev(button3, img3);
			append_dev(button3, t16);
			append_dev(div5, t17);
			if (if_block3) if_block3.m(div5, null);
			append_dev(div13, t18);
			append_dev(div13, div12);
			append_dev(div12, span1);
			append_dev(div12, t20);
			append_dev(div12, div11);
			append_dev(div11, div10);
			append_dev(div10, button4);
			append_dev(button4, img4);
			append_dev(button4, t21);
			append_dev(button4, br0);
			append_dev(button4, t22);
			append_dev(div10, t23);
			append_dev(div10, button5);
			append_dev(button5, img5);
			append_dev(button5, t24);
			append_dev(button5, br1);
			append_dev(button5, t25);
			append_dev(div10, t26);
			append_dev(div10, button6);
			append_dev(button6, img6);
			append_dev(button6, t27);
			append_dev(button6, br2);
			append_dev(button6, t28);
			append_dev(div10, t29);
			append_dev(div10, button7);
			append_dev(button7, img7);
			append_dev(button7, t30);
			append_dev(button7, br3);
			append_dev(button7, t31);
			append_dev(div10, t32);
			append_dev(div10, button8);
			append_dev(button8, img8);
			append_dev(button8, t33);
			append_dev(button8, br4);
			append_dev(button8, t34);
			append_dev(div18, t35);
			append_dev(div18, div17);
			append_dev(div17, div15);
			if_block4.m(div15, null);
			append_dev(div17, t36);
			append_dev(div17, div16);
			append_dev(div16, h3);
			append_dev(div16, t38);
			if (if_block5) if_block5.m(div16, null);
			current = true;

			if (!mounted) {
				dispose = [
					listen_dev(button0, "click", /*click_handler*/ ctx[20], false, false, false, false),
					listen_dev(button1, "click", /*click_handler_1*/ ctx[21], false, false, false, false),
					listen_dev(input0, "change", /*input0_change_handler*/ ctx[24]),
					listen_dev(input0, "change", /*change_handler*/ ctx[26], false, false, false, false),
					listen_dev(button2, "click", /*click_handler_4*/ ctx[27], false, false, false, false),
					listen_dev(input1, "change", /*input1_change_handler*/ ctx[29]),
					listen_dev(input1, "change", /*change_handler_1*/ ctx[31], false, false, false, false),
					listen_dev(button3, "click", /*click_handler_6*/ ctx[32], false, false, false, false),
					listen_dev(button4, "click", /*click_handler_8*/ ctx[34], false, false, false, false),
					listen_dev(button5, "click", /*click_handler_9*/ ctx[35], false, false, false, false),
					listen_dev(button6, "click", /*click_handler_10*/ ctx[36], false, false, false, false),
					listen_dev(button7, "click", /*click_handler_11*/ ctx[37], false, false, false, false),
					listen_dev(button8, "click", /*click_handler_12*/ ctx[38], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			const loadingbar_changes = {};

			if (!updating_progress && dirty[0] & /*progress*/ 1024) {
				updating_progress = true;
				loadingbar_changes.progress = /*progress*/ ctx[10];
				add_flush_callback(() => updating_progress = false);
			}

			if (!updating_status && dirty[0] & /*load_status*/ 512) {
				updating_status = true;
				loadingbar_changes.status = /*load_status*/ ctx[9];
				add_flush_callback(() => updating_status = false);
			}

			loadingbar.$set(loadingbar_changes);

			if (!current || dirty[0] & /*is_loading*/ 256) {
				toggle_class(div0, "invisible", /*is_loading*/ ctx[8] === false);
			}

			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block0) {
				if_block0.p(ctx, dirty);
			} else {
				if_block0.d(1);
				if_block0 = current_block_type(ctx);

				if (if_block0) {
					if_block0.c();
					if_block0.m(div1, t1);
				}
			}

			if (!current || dirty[0] & /*feedback_list*/ 2 && button0_disabled_value !== (button0_disabled_value = !/*feedback_list*/ ctx[1] || /*feedback_list*/ ctx[1].length <= 0)) {
				prop_dev(button0, "disabled", button0_disabled_value);
			}

			if (!current || dirty[0] & /*feedback_list*/ 2 && button1_disabled_value !== (button1_disabled_value = !/*feedback_list*/ ctx[1] || /*feedback_list*/ ctx[1].length <= 0)) {
				prop_dev(button1, "disabled", button1_disabled_value);
			}

			if (current_block_type_1 === (current_block_type_1 = select_block_type_1(ctx)) && if_block1) {
				if_block1.p(ctx, dirty);
			} else {
				if_block1.d(1);
				if_block1 = current_block_type_1(ctx);

				if (if_block1) {
					if_block1.c();
					if_block1.m(div2, null);
				}
			}

			if (!current || dirty[0] & /*is_loading, media_files*/ 272 && button2_disabled_value !== (button2_disabled_value = /*is_loading*/ ctx[8] || !/*media_files*/ ctx[4] || /*media_files*/ ctx[4].length === 0)) {
				prop_dev(button2, "disabled", button2_disabled_value);
			}

			if (/*recording*/ ctx[0].video || /*recording*/ ctx[0].audio) {
				if (if_block2) {
					if_block2.p(ctx, dirty);
				} else {
					if_block2 = create_if_block_6$1(ctx);
					if_block2.c();
					if_block2.m(div3, null);
				}
			} else if (if_block2) {
				if_block2.d(1);
				if_block2 = null;
			}

			if (!current || dirty[0] & /*is_loading, transcript_files*/ 320 && button3_disabled_value !== (button3_disabled_value = /*is_loading*/ ctx[8] || !/*transcript_files*/ ctx[6] || /*transcript_files*/ ctx[6].length === 0)) {
				prop_dev(button3, "disabled", button3_disabled_value);
			}

			if (/*recording*/ ctx[0].transcript_list && /*recording*/ ctx[0].transcript_list.length > 0) {
				if (if_block3) {
					if_block3.p(ctx, dirty);
				} else {
					if_block3 = create_if_block_5$3(ctx);
					if_block3.c();
					if_block3.m(div5, null);
				}
			} else if (if_block3) {
				if_block3.d(1);
				if_block3 = null;
			}

			if (!current || dirty[0] & /*recording, is_loading*/ 257 && button4_disabled_value !== (button4_disabled_value = !/*recording*/ ctx[0] || !/*recording*/ ctx[0].transcript_list || /*is_loading*/ ctx[8])) {
				prop_dev(button4, "disabled", button4_disabled_value);
			}

			if (!current || dirty[0] & /*recording, is_loading*/ 257 && button5_disabled_value !== (button5_disabled_value = !/*recording*/ ctx[0] || !/*recording*/ ctx[0].transcript_list || /*is_loading*/ ctx[8])) {
				prop_dev(button5, "disabled", button5_disabled_value);
			}

			if (!current || dirty[0] & /*recording, is_loading*/ 257 && button6_disabled_value !== (button6_disabled_value = !/*recording*/ ctx[0] || !/*recording*/ ctx[0].transcript_list || /*is_loading*/ ctx[8])) {
				prop_dev(button6, "disabled", button6_disabled_value);
			}

			if (!current || dirty[0] & /*recording, is_loading, feedback_list*/ 259 && button7_disabled_value !== (button7_disabled_value = !/*recording*/ ctx[0] || !/*recording*/ ctx[0].transcript_list || /*is_loading*/ ctx[8] || /*feedback_list*/ ctx[1].length <= 0)) {
				prop_dev(button7, "disabled", button7_disabled_value);
			}

			if (!current || dirty[0] & /*recording, is_loading, feedback_list*/ 259 && button8_disabled_value !== (button8_disabled_value = !/*recording*/ ctx[0] || !/*recording*/ ctx[0].transcript_list || /*is_loading*/ ctx[8] || /*feedback_list*/ ctx[1].length <= 0)) {
				prop_dev(button8, "disabled", button8_disabled_value);
			}

			if (current_block_type_2 === (current_block_type_2 = select_block_type_2(ctx)) && if_block4) {
				if_block4.p(ctx, dirty);
			} else {
				if_block4.d(1);
				if_block4 = current_block_type_2(ctx);

				if (if_block4) {
					if_block4.c();
					if_block4.m(div15, null);
				}
			}

			if (/*recording*/ ctx[0] && /*recording*/ ctx[0].transcript_list) {
				if (if_block5) {
					if_block5.p(ctx, dirty);
				} else {
					if_block5 = create_if_block$6(ctx);
					if_block5.c();
					if_block5.m(div16, null);
				}
			} else if (if_block5) {
				if_block5.d(1);
				if_block5 = null;
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(loadingbar.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(loadingbar.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div18);
			destroy_component(loadingbar);
			if_block0.d();
			if_block1.d();
			/*input0_binding*/ ctx[25](null);
			if (if_block2) if_block2.d();
			/*input1_binding*/ ctx[30](null);
			if (if_block3) if_block3.d();
			if_block4.d();
			if (if_block5) if_block5.d();
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$q.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

async function fetchVideo(video_path) {
	try {
		const response = await fetch("/fetch_video", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ "path": video_path })
		});

		const blob = await response.blob();
		let video_source = URL.createObjectURL(blob);
		return video_source;
	} catch(error) {
		console.error(error);
	}
}

async function fetchAudio(audio_path) {
	try {
		const response = await fetch("/fetch_audio", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ audio_path })
		});

		const blob = await response.blob();
		let audio_source = URL.createObjectURL(blob);
		return audio_source;
	} catch(error) {
		console.error(error);
	}
}

async function transcribeMic(micPath) {
	const response = await fetch('/transcribe_mic', {
		method: 'POST',
		body: JSON.stringify({ "audio": micPath }),
		headers: { 'Content-Type': 'application/json' }
	});

	if (!response.ok) {
		throw new Error('Failed to transcribe audio');
	} else {
		const json = await response.json();
		let transcript = json["transcript"];
		return transcript;
	}
}

async function embedTranscriptList(transcript_list) {
	const response = await fetch("/embed_transcript", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ transcript: transcript_list })
	});

	if (!response.ok) {
		throw new Error("Failed to embed transcript list");
	}
}

async function extractAudioFromVideo(videoFile) {
	const formData = new FormData();
	formData.append('file', videoFile);
	const response = await fetch('/extract_audio_from_video', { method: 'POST', body: formData });

	if (!response.ok) {
		return null;
	}

	const json = await response.json();
	return [json["audiopath"], json["videopath"]];
}

async function simplifyTranscript(transcript) {
	const response = await fetch("/simplify_transcript", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ transcript })
	});

	if (!response.ok) {
		throw new Error("Failed to simplify transcript string");
	}

	const json = await response.json();
	return json["simplified_transcript"];
}

async function convertTranscriptToList(transcript) {
	const response = await fetch("/transcript_to_list", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ transcript })
	});

	if (!response.ok) {
		throw new Error("Failed to convert transcript string to list of excerpts");
	}

	// 4) Send response back here to client
	const json = await response.json();

	let transcript_list = json["transcript_list"];
	return transcript_list;
}

function convertTranscriptListToStr(transcript_list) {
	let transcript_str = "";

	for (let i = 0; i < transcript_list.length; i++) {
		let excerpt = transcript_list[i];
		let id = excerpt.id;
		let start = excerpt.start_timestamp;
		let end = excerpt.end_timestamp;
		let dialogue = excerpt.dialogue;

		if ("speaker" in excerpt && excerpt.speaker != "") {
			let speaker = excerpt.speaker;
			transcript_str += `${id}\n${start} --> ${end}\n${speaker}: ${dialogue}\n\n`;
		} else {
			transcript_str += `${id}\n${start} --> ${end}\n${dialogue}\n\n`;
		}
	}

	return transcript_str;
}

async function autoDetectFeedback(transcript_list) {
	let feedback_list = [];
	let transcript_str = convertTranscriptListToStr(transcript_list);

	const response = await fetch("/autodetect_feedback", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ transcript: transcript_str })
	});

	if (!response.ok) {
		throw new Error("Failed to detect feedback");
	}

	const json = await response.json();
	feedback_list = json["feedback_list"];
	console.log(feedback_list);
	return feedback_list;
}

function findExcerptByID(transcript_list, id) {
	id = parseInt(id);

	for (let i = 0; i < transcript_list.length; i++) {
		let excerpt = transcript_list[i];

		if (excerpt.id === id) {
			return excerpt;
		}
	}

	console.log("Error: Can't find excerpt with id", id);
	return null;
}

function findExcerptByQuote(transcript_list, quote) {
	console.log(quote);

	for (let i = 0; i < transcript_list.length; i++) {
		let excerpt = transcript_list[i];
		let excerpt_str = excerpt.dialogue;

		if (excerpt.speaker) {
			excerpt_str = excerpt.speaker + ": " + excerpt_str;
		}

		if (excerpt_str.includes(quote)) {
			return excerpt;
		}
	}

	return null;
}

const func$1 = (acc, cur) => {
	acc[cur.speaker] = true;
	return acc;
};

const func_1 = (acc, cur) => {
	acc[cur.speaker] = (acc[cur.speaker] || 0) + 1;
	return acc;
};

const func_2 = feedback => feedback.type === 'positive';
const func_3 = feedback => feedback.type === 'critical';

function instance$q($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('FeedbackSelector', slots, []);
	let { recording = {} } = $$props;
	let { feedback_list = [] } = $$props;
	let tooltip;
	let to_transcribe = false;
	let feedback_idx = 0;
	let mediaPlayer;
	let ld_bar_transcript;
	let is_recording = false;
	let is_paused = false;
	let videoStream;
	let micStream;
	let settings;
	let micBlobs = [];
	let videoChunks = [];
	let videoRecorder;
	let micRecorder;
	let videoPath;
	let micPath;
	let media_files, mediafile_input;
	let transcript_files, transcript_fileinput;
	let is_loading = false;
	let load_status = "";
	let progress = 0;

	async function sendVideoToServer(videoBlobs) {
		const vidblob = new Blob(videoBlobs, { type: 'video/webm' });
		console.log("video blobs", { videoBlobs, vidblob });
		let data = new FormData();
		data.append('file', vidblob);

		if (vidblob.length === 0 || !vidblob) {
			return null;
		}

		const response = await fetch('/download_screen', { method: 'POST', body: data });

		if (!response.ok) {
			micPath = null;
			videoPath = null;

			// throw new Error('Failed to send video to server');
			console.log('Failed to send video to server');
		} else {
			const json = await response.json();
			videoPath = json["filepath"];
		}

		return videoPath;
	}

	async function sendAudioToServer(audioBlobs) {
		const blob = new Blob(audioBlobs, { type: 'audio/webm' });
		console.log("audio blobs", { audioBlobs, blob });
		let data = new FormData();
		data.append('audio', blob, 'audio.webm');
		const response = await fetch('/download_mic', { method: 'POST', body: data });

		if (!response.ok) {
			micPath = null;
			videoPath = null;
			throw new Error('Failed to send audio to server');
		} else {
			const json = await response.json();
			micPath = json["filepath"];
		}

		return micPath;
	}

	async function startRecording() {
		is_recording = true;

		videoStream = await navigator.mediaDevices.getDisplayMedia({
			video: { frameRate: 60 },
			//@ts-ignore
			selfBrowserSurface: 'include'
		});

		videoRecorder = new MediaRecorder(videoStream, { mimeType: 'video/webm' });
		videoRecorder.videoChunks = [];

		videoRecorder.addEventListener('dataavailable', event => {
			if (event.data.size > 0) {
				videoChunks.push(event.data);
			}
		});

		videoRecorder.addEventListener('stop', () => {
			
		}); // sendVideoToServer(videoChunks);
		// console.log("video chunks", videoChunks);
		// videoChunks = [];

		micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
		micRecorder = new MediaRecorder(micStream);
		micRecorder.audioBlobs = [];

		micRecorder.addEventListener('dataavailable', event => {
			if (event.data.size > 0) {
				micBlobs.push(event.data);
			}
		});

		micRecorder.addEventListener('stop', () => {
			
		}); // sendAudioToServer(micBlobs);
		// micBlobs = [];

		videoRecorder.start();
		micRecorder.start();
	}

	function pauseRecording() {
		is_recording = false;
		is_paused = true;
		videoRecorder.pause();
		micRecorder.pause();
	}

	function resumeRecording() {
		is_recording = true;
		is_paused = false;
		videoRecorder.resume();
		micRecorder.resume();
	}

	async function stopRecording() {
		is_recording = false;
		is_paused = false;
		videoStream.getTracks().forEach(track => track.stop());
		micStream.getTracks().forEach(track => track.stop());
		$$invalidate(9, load_status = "Saving video and audio ...");
		$$invalidate(10, progress = 20);
		videoPath = await sendVideoToServer(videoChunks); //Bug workaround: Do this for the first time because newly created vidblob is empty during first time.
		videoPath = await sendVideoToServer(videoChunks);
		videoChunks = [];
		let videoSrc = await fetchVideo(videoPath);
		micPath = await sendAudioToServer(micBlobs);
		micBlobs = [];
		let micSrc = await fetchAudio(micPath);
		$$invalidate(9, load_status = "Transcribing audio (this may take a while) ...");
		$$invalidate(10, progress = 40);
		let transcript = await transcribeMic(micPath);
		$$invalidate(9, load_status = "Cleaning transcript...");
		$$invalidate(10, progress = 60);
		let simplified_transcript = await simplifyTranscript(transcript);
		let transcript_list = await convertTranscriptToList(simplified_transcript);
		$$invalidate(9, load_status = "Saving transcript as a database (this may take a while) ... ");
		$$invalidate(10, progress = 80);
		await embedTranscriptList(transcript_list);
		$$invalidate(9, load_status = "Done!");
		$$invalidate(10, progress = 100);
		await pause(1500);

		let newRecording = {
			video: videoSrc,
			video_path: videoPath,
			audio: micSrc,
			audio_path: micPath,
			transcript: simplified_transcript,
			transcript_list
		};

		$$invalidate(0, recording = newRecording);
	} // await incrementRecordNumber();

	async function deleteRecording() {
		let response = await fetch("/delete_recording", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ recording })
		});

		$$invalidate(0, recording = {});
		let response_json = await response.json();

		if ("message" in response_json) {
			console.log(response_json["message"]);
		}

		return response_json["message"];
	}

	async function deleteRecordingMedia() {
		let response = await fetch("/delete_recording_media", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ recording })
		});

		let response_json = await response.json();

		if ("message" in response_json) {
			console.log(response_json["message"]);
		}

		return response_json["message"];
	}

	async function handleMediaUpload() {
		if (media_files) {
			for (const file of media_files) {
				console.log(file.type);

				if (file.type.includes('video')) {
					if (recording || "video" in recording || "audio" in recording || "transcript_list" in recording) {
						if (recording.video || recording.audio) {
							let confirm = window.confirm("Uploading a new video will overwrite this current media. Do you want to proceed?");

							if (!confirm) {
								return;
							}

							await deleteRecordingMedia();

							if (recording.audio) {
								$$invalidate(0, recording.audio = null, recording);
								$$invalidate(0, recording.audio_path = null, recording);
								$$invalidate(0, recording);
							}

							if (recording.video) {
								$$invalidate(0, recording.video = null, recording);
								$$invalidate(0, recording.video_path = null, recording);
								$$invalidate(0, recording);
							}

							// recording.transcript_list = [];
							// recording.transcript = "";
							// recording=recording;
							await saveRecording(recording);

							await logAction("FeedbackSelector: Remove media", recording);
						}
					}

					// feedback_list=[];
					let videoSrc = URL.createObjectURL(file);

					$$invalidate(9, load_status = "Uploading video...");
					$$invalidate(10, progress = to_transcribe ? 20 : 50);
					[micPath, videoPath] = await extractAudioFromVideo(file);

					if (!micPath || !videoPath) {
						micPath = null;
						videoPath = null;
						throw new Error('Failed to extract audio from video');
					}

					let micSrc = await fetchAudio(micPath);
					let transcript = "";
					let transcript_list = [];

					if (to_transcribe) {
						$$invalidate(9, load_status = "Transcribing audio (this may take a while) ...");
						$$invalidate(10, progress = 40);
						transcript = await transcribeMic(micPath);
						$$invalidate(9, load_status = "Cleaning transcript...");
						$$invalidate(10, progress = 60);

						// load_status="Extracting video frames from transcript timestamps...";
						// let timestamp_frames = await extractFrames(videoPath, transcript);
						transcript = await simplifyTranscript(transcript);

						transcript_list = await convertTranscriptToList(transcript);
						$$invalidate(9, load_status = "Saving transcript as a database (this may take a while) ... ");
						$$invalidate(10, progress = 80);
						await embedTranscriptList(transcript_list);
					}

					$$invalidate(9, load_status = "Done!");
					$$invalidate(10, progress = 100);
					pause(1500);
					$$invalidate(10, progress = 0);

					let newRecording = {
						video: videoSrc,
						video_path: videoPath,
						audio: micSrc,
						audio_path: micPath,
						transcript,
						transcript_list
					};

					if (recording && ("transcript_list" in recording && recording.transcript_list)) {
						$$invalidate(0, recording.video = videoSrc, recording);
						$$invalidate(0, recording.video_path = videoPath, recording);
						$$invalidate(0, recording.audio = micSrc, recording);
						$$invalidate(0, recording.audio_path = micPath, recording);
						$$invalidate(0, recording);
						$$invalidate(0, recording);
					} else {
						$$invalidate(0, recording = newRecording);
					}

					micPath = null;
					videoPath = null;
				} else if (file.type.includes('audio')) {
					if (recording || "audio" in recording || "video" in recording || "transcript_list" in recording) {
						if (recording.audio || recording.video) {
							let confirm = window.confirm("Uploading a new audio will overwrite this current media. Do you want to proceed?"); // await incrementRecordNumber();

							if (!confirm) {
								return;
							}

							await deleteRecordingMedia();

							if (recording.audio) {
								$$invalidate(0, recording.audio = null, recording);
								$$invalidate(0, recording.audio_path = null, recording);
								$$invalidate(0, recording);
							}

							if (recording.video) {
								$$invalidate(0, recording.video = null, recording);
								$$invalidate(0, recording.video_path = null, recording);
								$$invalidate(0, recording);
							}

							await saveRecording(recording);
							await logAction("FeedbackSelector: Remove media", recording);
						}
					}

					// feedback_list=[];
					let audioSrc = URL.createObjectURL(file);

					// Save the audio file and get its path
					$$invalidate(9, load_status = "Uploading audio...");

					$$invalidate(10, progress = to_transcribe ? 20 : 50);
					const formData = new FormData();
					formData.append('audio', file);
					const response = await fetch('/download_mic', { method: 'POST', body: formData });

					if (!response.ok) {
						micPath = null;
						videoPath = null;
						throw new Error('Failed to save uploaded audio');
					}

					let json = await response.json();
					micPath = json["filepath"];
					let transcript = "";
					let transcript_list = [];

					if (to_transcribe) {
						// Transcribe the audio
						$$invalidate(9, load_status = "Transcribing audio (this may take a while) ...");

						$$invalidate(10, progress = 40);
						transcript = await transcribeMic(micPath);
						$$invalidate(9, load_status = "Cleaning transcript...");
						$$invalidate(10, progress = 60);
						transcript = await simplifyTranscript(transcript);
						transcript_list = await convertTranscriptToList(transcript);
						$$invalidate(9, load_status = "Saving transcript as a database (this may take a while) ... ");
						$$invalidate(10, progress = 80);
						await embedTranscriptList(transcript_list);
					}

					$$invalidate(9, load_status = "Done!");
					$$invalidate(10, progress = 100);
					await pause(1500);
					$$invalidate(10, progress = 0);

					let newRecording = {
						video: null,
						video_path: null,
						audio: audioSrc,
						audio_path: micPath,
						transcript,
						transcript_list
					};

					if (recording && ("transcript_list" in recording && recording.transcript_list)) {
						$$invalidate(0, recording.audio = audioSrc, recording);
						$$invalidate(0, recording.audio_path = micPath, recording);
						$$invalidate(0, recording);
						$$invalidate(0, recording);
					} else {
						$$invalidate(0, recording = newRecording);
					}

					micPath = null;
					videoPath = null;
				} // await incrementRecordNumber();
			}

			// Clear the file input
			$$invalidate(4, media_files = null);

			$$invalidate(5, mediafile_input.value = '', mediafile_input);
		}

		console.log("Recording", recording);
		$$invalidate(10, progress = 0);
		$$invalidate(9, load_status = "");
	}

	async function handleTranscriptUpload() {
		if (transcript_files) {
			for (const file of transcript_files) {
				console.log(file.type);

				if (file.name.endsWith('.srt')) {
					if (recording || "transcript" in recording || "transcript_list" in recording) {
						if (recording.transcript_list) {
							if (recording.transcript_list.length > 0) {
								let confirm = window.confirm("Uploading a new transcript will overwrite this current transcript. Do you want to proceed?");

								if (!confirm) {
									return;
								}

								removeAllFeedback();
								$$invalidate(1, feedback_list = []);
								$$invalidate(0, recording.transcript_list = [], recording);
								$$invalidate(0, recording.transcript = "", recording);
								$$invalidate(0, recording);
								await saveRecording(recording);
								await logAction("FeedbackSelector: Remove transcript", recording);
							}
						}
					}

					let reader = new FileReader();

					reader.onload = async function (e) {
						console.log(ld_bar_transcript);
						$$invalidate(8, is_loading = true);
						let text = e.target.result;
						console.log(text);
						$$invalidate(9, load_status = "Cleaning transcript...");
						$$invalidate(10, progress = 30);
						let transcript = await simplifyTranscript(text);
						await pause(1500);
						let transcript_list = await convertTranscriptToList(transcript);

						let newRecording = {
							video: null,
							video_path: null,
							audio: null,
							audio_path: null,
							transcript,
							transcript_list
						};

						if (recording && ("video" in recording && recording.video || "audio" in recording && recording.audio)) {
							$$invalidate(0, recording.transcript_list = transcript_list, recording);
							$$invalidate(0, recording);
							$$invalidate(0, recording.transcript = transcript, recording);
							$$invalidate(0, recording);
							$$invalidate(0, recording);
							$$invalidate(0, recording);
						} else {
							$$invalidate(0, recording = newRecording);
						}

						$$invalidate(9, load_status = "Saving transcript as a database (this may take a while) ... ");
						$$invalidate(10, progress = 60);
						await embedTranscriptList(transcript_list);

						// await saveTranscriptList();
						await saveRecording(recording);

						console.log("Transcript list embedded");
						$$invalidate(9, load_status = "Done!");
						$$invalidate(10, progress = 100);
						await pause(500);
						$$invalidate(10, progress = 0);
						$$invalidate(8, is_loading = false);
					};

					reader.readAsText(file);
				}
			}

			// Clear the file input
			$$invalidate(6, transcript_files = null);

			$$invalidate(7, transcript_fileinput.value = '', transcript_fileinput);
		}

		console.log("Recording", recording);
		$$invalidate(10, progress = 0);
		$$invalidate(9, load_status = "");
	}

	function addFeedback(type) {
		const selection = window.getSelection().toString();

		if (selection.trim() === "") {
			alert("Please highlight text in the transcript with your mouse to add as feedback.");
			return "Error: No text highlighted";
		}

		if (selection) {
			let feedback = {
				quote: selection,
				type,
				done: false,
				speaker: null,
				dialogue_id: null
			};

			let excerpt_reference = findExcerptByQuote(recording.transcript_list, selection);

			// console.log(excerpt_reference);
			if (!excerpt_reference) {
				console.log("Error: Corresponding transcript excerpt not found");
				alert("Error: Corresponding transcript excerpt not found. Feedback not added.");
				return "Error: Corresponding transcript excerpt not found for selection: " + selection;
			}

			feedback.id = feedback_list.length + 1;
			feedback.dialogue_id = excerpt_reference.id;
			feedback.speaker = excerpt_reference.speaker;
			feedback.excerpt_reference = excerpt_reference;

			feedback.chatbot_messages = [
				{
					"role": "system",
					"content": "You are an expert senior interior designer who is tasked to assist less experienced interior designers like students and junior interior designers with their work by answering their questions on a wide range of interior design topics. "
				}
			];

			feedback_list.push(feedback);
			$$invalidate(1, feedback_list);
			$$invalidate(0, recording);
			autoHighlightFeedback([feedback]);
			return feedback;
		} else {
			alert("Please highlight text in the transcript with your mouse to add as feedback.");
			return "Error: No text highlighted";
		}
	}

	function removeFeedback() {
		const selection = window.getSelection().toString();

		if (selection.trim() === "") {
			alert("Please highlight the feedback you want to remove using your mouse.");
			return "Error: No text highlighted";
		}

		if (selection) {
			for (let i = 0; i < feedback_list.length; i++) {
				let feedback = feedback_list[i];

				if (feedback.quote.includes(selection)) {
					let dialogue_id = parseInt(feedback.dialogue_id);
					let feedback_quote = feedback.quote;
					feedback_list.splice(i, 1);
					$$invalidate(1, feedback_list);
					deHighlightFeedback(dialogue_id, feedback_quote);
					return feedback;
				}
			}
		}

		return "Error: Feedback not found for selection: " + selection;
	}

	function removeAllFeedback() {
		for (let i = 0; i < feedback_list.length; i++) {
			let feedback = feedback_list[i];
			let dialogue_id = parseInt(feedback.dialogue_id);
			let feedback_quote = feedback.quote;
			deHighlightFeedback(dialogue_id, feedback_quote);
			feedback_list.splice(i, 1);
			$$invalidate(1, feedback_list);
		}
	}

	function deHighlightFeedback(dialogue_id, feedback_quote) {
		for (let j = 0; j < recording.transcript_list.length; j++) {
			let e = recording.transcript_list[j];

			if (e.id === dialogue_id) {
				let dialogue = e.dialogue;
				let start_index = dialogue.indexOf("<mark");
				let end_index = dialogue.indexOf("</mark>") + 7;

				// BUG: The highlight in the dialogue is not being removed
				let highlighted_dialogue = dialogue.slice(0, start_index) + feedback_quote + dialogue.slice(end_index);

				e.dialogue = highlighted_dialogue;
				e.dialogue = e.dialogue;
				$$invalidate(0, recording);
				break;
			}
		}
	}

	function autoHighlightFeedback(feedback_list) {
		for (let i = 0; i < feedback_list.length; i++) {
			let feedback = feedback_list[i];
			let feedback_type = feedback.type;

			if (feedback.type != "positive" && feedback.type != "critical") {
				continue;
			}

			let dialogue_id = parseInt(feedback.dialogue_id);
			let excerpt;

			for (let j = 0; j < recording.transcript_list.length; j++) {
				let e = recording.transcript_list[j];

				if (e.id === dialogue_id) {
					excerpt = e;
					break;
				}
			}

			if (!excerpt) {
				console.log("Error: Corresponding transcript excerpt not found");
				continue;
			}

			let dialogue = excerpt.dialogue;
			let start_index = dialogue.indexOf(feedback.quote);
			let end_index = start_index + feedback.quote.length;

			let highlighted_dialogue = dialogue.slice(0, start_index) + `<mark class="${feedback_type}" style="background-color:${feedback_type === "positive"
			? "lightgreen"
			: "lightcoral"};">${feedback.quote}</mark>` + dialogue.slice(end_index);

			excerpt.dialogue = highlighted_dialogue;
		}

		$$invalidate(0, recording);
	}

	onMount(async () => {
		console.log(recording);
	});

	const writable_props = ['recording', 'feedback_list'];

	Object_1$2.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$1.warn(`<FeedbackSelector> was created with unknown prop '${key}'`);
	});

	function loadingbar_progress_binding(value) {
		progress = value;
		$$invalidate(10, progress);
	}

	function loadingbar_status_binding(value) {
		load_status = value;
		$$invalidate(9, load_status);
	}

	const click_handler = async () => {
		if (feedback_idx > 0) {
			$$invalidate(2, feedback_idx--, feedback_idx);
		} else {
			$$invalidate(2, feedback_idx = feedback_list.length - 1);
		}

		focusOnFeedback(feedback_list[feedback_idx]);
		await logAction("FeedbackSelector: Traverse to previous feedback", feedback_list[feedback_idx]);
	};

	const click_handler_1 = async () => {
		if (feedback_idx < feedback_list.length - 1) {
			$$invalidate(2, feedback_idx++, feedback_idx);
		} else {
			$$invalidate(2, feedback_idx = 0);
		}

		focusOnFeedback(feedback_list[feedback_idx]);
		await logAction("FeedbackSelector: Traverse to next feedback", feedback_list[feedback_idx]);
	};

	const click_handler_2 = async excerpt => {
		seekTo(excerpt.start_timestamp, mediaPlayer);
		await logAction("FeedbackSelector: Seeked to start timestamp", excerpt.start_timestamp);
	};

	const click_handler_3 = async excerpt => {
		seekTo(excerpt.end_timestamp, mediaPlayer);
		await logAction("FeedbackSelector: Seeked to end timestamp", excerpt.end_timestamp);
	};

	function input0_change_handler() {
		media_files = this.value;
		$$invalidate(4, media_files);
	}

	function input0_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			mediafile_input = $$value;
			$$invalidate(5, mediafile_input);
		});
	}

	const change_handler = async e => {
		$$invalidate(4, media_files = e.target.files);
		console.log(media_files);
		await logAction("FeedbackSelector: Select media file", media_files);
	};

	const click_handler_4 = async () => {
		$$invalidate(8, is_loading = true);
		await handleMediaUpload();
		$$invalidate(8, is_loading = false);
		await saveRecording(recording);
		await logAction("FeedbackSelector: Upload media", recording);
	};

	const click_handler_5 = async () => {
		let confirm = window.confirm("This cannot be undone. Do you want to proceed?");

		if (confirm) {
			// recording = {};
			await deleteRecordingMedia();

			if (recording.audio) {
				$$invalidate(0, recording.audio = null, recording);
				$$invalidate(0, recording.audio_path = null, recording);
				$$invalidate(0, recording);
			}

			if (recording.video) {
				$$invalidate(0, recording.video = null, recording);
				$$invalidate(0, recording.video_path = null, recording);
				$$invalidate(0, recording);
			}

			await saveRecording(recording);
			await logAction("FeedbackSelector: Remove media", recording);
		}
	};

	function input1_change_handler() {
		transcript_files = this.value;
		$$invalidate(6, transcript_files);
	}

	function input1_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			transcript_fileinput = $$value;
			$$invalidate(7, transcript_fileinput);
		});
	}

	const change_handler_1 = async e => {
		$$invalidate(6, transcript_files = e.target.files);
		await logAction("FeedbackSelector: Select transcript file", transcript_files);
	};

	const click_handler_6 = async () => {
		$$invalidate(8, is_loading = true);
		await handleTranscriptUpload();
		$$invalidate(8, is_loading = false);
		console.log(recording);
		await logAction("FeedbackSelector: Upload transcript", recording);
	};

	const click_handler_7 = async () => {
		let confirm = window.confirm("This cannot be undone. Do you want to proceed?");

		if (confirm) {
			removeAllFeedback();
			$$invalidate(1, feedback_list = []);
			$$invalidate(0, recording.transcript_list = [], recording);
			$$invalidate(0, recording.transcript = "", recording);
			$$invalidate(0, recording);
			await saveRecording(recording);
			await logAction("FeedbackSelector: Remove transcript", recording);
		}
	};

	const click_handler_8 = async () => {
		if (feedback_list.length > 0) {
			let confirm = window.confirm("Auto-detecting again will clear all feedback highlighted. Do you want to proceed?");

			if (!confirm) {
				return;
			}
		}

		$$invalidate(8, is_loading = true);
		$$invalidate(10, progress = 0);
		let list = recording.transcript_list;

		// Divide list into 4 equally sized chunks.
		let chunk_size = Math.ceil(list.length / 4);

		let chunk1 = list.slice(0, chunk_size);
		let chunk2 = list.slice(chunk_size, 2 * chunk_size);
		let chunk3 = list.slice(2 * chunk_size, 3 * chunk_size);
		let chunk4 = list.slice(3 * chunk_size, list.length);
		let chunks = [chunk1, chunk2, chunk3, chunk4];
		$$invalidate(9, load_status = "Detecting feedback in transcript ...");

		for (let i = 0; i < chunks.length; i++) {
			let thing = await autoDetectFeedback(chunks[i]);
			$$invalidate(1, feedback_list = feedback_list.concat(thing));
			$$invalidate(10, progress = (i + 1) * 20);
			await pause(250);
		}

		$$invalidate(1, feedback_list);
		console.log(feedback_list);

		for (let j = 0; j < feedback_list.length; j++) {
			$$invalidate(1, feedback_list[j].id = j + 1, feedback_list); // Assign unique id to each feedback
			let reference_id = feedback_list[j].dialogue_id;
			let excerpt = findExcerptByID(recording.transcript_list, reference_id);
			$$invalidate(1, feedback_list[j].excerpt_reference = excerpt, feedback_list);
		}

		$$invalidate(1, feedback_list);
		$$invalidate(9, load_status = "Highlighting feedback ...");
		autoHighlightFeedback(feedback_list);
		await saveFeedbackList(feedback_list);
		await saveRecording(recording);
		await pause(500);
		$$invalidate(10, progress = 100);
		console.log("Feedback: " + feedback_list[0]);
		$$invalidate(8, is_loading = false);
		$$invalidate(10, progress = 0);
		$$invalidate(9, load_status = "");
		await logAction("FeedbackSelector: Auto-detect feedback", feedback_list);
	};

	const click_handler_9 = async () => {
		let selection = addFeedback("positive");
		await saveFeedbackList(feedback_list);
		await saveRecording(recording);
		await logAction("FeedbackSelector: Add positive feedback", selection);
	};

	const click_handler_10 = async () => {
		let selection = addFeedback("critical");
		await saveFeedbackList(feedback_list);
		await saveRecording(recording);
		await logAction("FeedbackSelector: Add critical feedback", selection);
	};

	const click_handler_11 = async () => {
		let selection = removeFeedback();
		await saveFeedbackList(feedback_list);
		await saveRecording(recording);
		await logAction("FeedbackSelector: Remove feedback", selection);
	};

	const click_handler_12 = async () => {
		removeAllFeedback();
		await saveFeedbackList(feedback_list);
		await saveRecording(recording);
		await logAction("FeedbackSelector: Removed all feedback", feedback_list);
	};

	function video_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			mediaPlayer = $$value;
			$$invalidate(3, mediaPlayer);
		});
	}

	function audio_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			mediaPlayer = $$value;
			$$invalidate(3, mediaPlayer);
		});
	}

	function video_binding_1($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			mediaPlayer = $$value;
			$$invalidate(3, mediaPlayer);
		});
	}

	$$self.$$set = $$props => {
		if ('recording' in $$props) $$invalidate(0, recording = $$props.recording);
		if ('feedback_list' in $$props) $$invalidate(1, feedback_list = $$props.feedback_list);
	};

	$$self.$capture_state = () => ({
		onMount,
		LoadingBar,
		seekTo,
		focusOnFeedback,
		logAction,
		pause,
		saveFeedbackList,
		saveRecording,
		recording,
		feedback_list,
		tooltip,
		to_transcribe,
		feedback_idx,
		mediaPlayer,
		ld_bar_transcript,
		is_recording,
		is_paused,
		videoStream,
		micStream,
		settings,
		micBlobs,
		videoChunks,
		videoRecorder,
		micRecorder,
		videoPath,
		micPath,
		media_files,
		mediafile_input,
		transcript_files,
		transcript_fileinput,
		is_loading,
		load_status,
		progress,
		sendVideoToServer,
		sendAudioToServer,
		fetchVideo,
		fetchAudio,
		transcribeMic,
		startRecording,
		pauseRecording,
		resumeRecording,
		embedTranscriptList,
		stopRecording,
		extractAudioFromVideo,
		deleteRecording,
		deleteRecordingMedia,
		handleMediaUpload,
		handleTranscriptUpload,
		simplifyTranscript,
		convertTranscriptToList,
		convertTranscriptListToStr,
		autoDetectFeedback,
		addFeedback,
		removeFeedback,
		removeAllFeedback,
		deHighlightFeedback,
		autoHighlightFeedback,
		findExcerptByID,
		findExcerptByQuote
	});

	$$self.$inject_state = $$props => {
		if ('recording' in $$props) $$invalidate(0, recording = $$props.recording);
		if ('feedback_list' in $$props) $$invalidate(1, feedback_list = $$props.feedback_list);
		if ('tooltip' in $$props) tooltip = $$props.tooltip;
		if ('to_transcribe' in $$props) to_transcribe = $$props.to_transcribe;
		if ('feedback_idx' in $$props) $$invalidate(2, feedback_idx = $$props.feedback_idx);
		if ('mediaPlayer' in $$props) $$invalidate(3, mediaPlayer = $$props.mediaPlayer);
		if ('ld_bar_transcript' in $$props) ld_bar_transcript = $$props.ld_bar_transcript;
		if ('is_recording' in $$props) is_recording = $$props.is_recording;
		if ('is_paused' in $$props) is_paused = $$props.is_paused;
		if ('videoStream' in $$props) videoStream = $$props.videoStream;
		if ('micStream' in $$props) micStream = $$props.micStream;
		if ('settings' in $$props) settings = $$props.settings;
		if ('micBlobs' in $$props) micBlobs = $$props.micBlobs;
		if ('videoChunks' in $$props) videoChunks = $$props.videoChunks;
		if ('videoRecorder' in $$props) videoRecorder = $$props.videoRecorder;
		if ('micRecorder' in $$props) micRecorder = $$props.micRecorder;
		if ('videoPath' in $$props) videoPath = $$props.videoPath;
		if ('micPath' in $$props) micPath = $$props.micPath;
		if ('media_files' in $$props) $$invalidate(4, media_files = $$props.media_files);
		if ('mediafile_input' in $$props) $$invalidate(5, mediafile_input = $$props.mediafile_input);
		if ('transcript_files' in $$props) $$invalidate(6, transcript_files = $$props.transcript_files);
		if ('transcript_fileinput' in $$props) $$invalidate(7, transcript_fileinput = $$props.transcript_fileinput);
		if ('is_loading' in $$props) $$invalidate(8, is_loading = $$props.is_loading);
		if ('load_status' in $$props) $$invalidate(9, load_status = $$props.load_status);
		if ('progress' in $$props) $$invalidate(10, progress = $$props.progress);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		recording,
		feedback_list,
		feedback_idx,
		mediaPlayer,
		media_files,
		mediafile_input,
		transcript_files,
		transcript_fileinput,
		is_loading,
		load_status,
		progress,
		deleteRecordingMedia,
		handleMediaUpload,
		handleTranscriptUpload,
		addFeedback,
		removeFeedback,
		removeAllFeedback,
		autoHighlightFeedback,
		loadingbar_progress_binding,
		loadingbar_status_binding,
		click_handler,
		click_handler_1,
		click_handler_2,
		click_handler_3,
		input0_change_handler,
		input0_binding,
		change_handler,
		click_handler_4,
		click_handler_5,
		input1_change_handler,
		input1_binding,
		change_handler_1,
		click_handler_6,
		click_handler_7,
		click_handler_8,
		click_handler_9,
		click_handler_10,
		click_handler_11,
		click_handler_12,
		video_binding,
		audio_binding,
		video_binding_1
	];
}

class FeedbackSelector extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$q, create_fragment$q, safe_not_equal, { recording: 0, feedback_list: 1 }, null, [-1, -1, -1]);

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "FeedbackSelector",
			options,
			id: create_fragment$q.name
		});
	}

	get recording() {
		throw new Error_1$2("<FeedbackSelector>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set recording(value) {
		throw new Error_1$2("<FeedbackSelector>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get feedback_list() {
		throw new Error_1$2("<FeedbackSelector>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set feedback_list(value) {
		throw new Error_1$2("<FeedbackSelector>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/components/Range.svelte generated by Svelte v3.59.2 */

const file$l = "src/components/Range.svelte";

function create_fragment$p(ctx) {
	let div;
	let input;
	let t0;
	let span;
	let t1;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			div = element("div");
			input = element("input");
			t0 = space();
			span = element("span");
			t1 = text(/*value*/ ctx[0]);
			attr_dev(input, "type", "range");
			attr_dev(input, "min", /*min*/ ctx[1]);
			attr_dev(input, "max", /*max*/ ctx[2]);
			attr_dev(input, "step", /*step*/ ctx[3]);
			attr_dev(input, "id", "rangeSlider");
			attr_dev(input, "class", "svelte-ohnqtn");
			add_location(input, file$l, 11, 2, 189);
			attr_dev(span, "id", "sliderValue");
			add_location(span, file$l, 12, 2, 281);
			attr_dev(div, "class", "centered spaced");
			set_style(div, "width", "100%");
			set_style(div, "height", "100%");
			add_location(div, file$l, 10, 0, 122);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, input);
			set_input_value(input, /*value*/ ctx[0]);
			append_dev(div, t0);
			append_dev(div, span);
			append_dev(span, t1);

			if (!mounted) {
				dispose = [
					listen_dev(input, "change", /*input_change_input_handler*/ ctx[4]),
					listen_dev(input, "input", /*input_change_input_handler*/ ctx[4])
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*min*/ 2) {
				attr_dev(input, "min", /*min*/ ctx[1]);
			}

			if (dirty & /*max*/ 4) {
				attr_dev(input, "max", /*max*/ ctx[2]);
			}

			if (dirty & /*step*/ 8) {
				attr_dev(input, "step", /*step*/ ctx[3]);
			}

			if (dirty & /*value*/ 1) {
				set_input_value(input, /*value*/ ctx[0]);
			}

			if (dirty & /*value*/ 1) set_data_dev(t1, /*value*/ ctx[0]);
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$p.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$p($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Range', slots, []);
	let { min = 0.0 } = $$props;
	let { max = 2.0 } = $$props;
	let { step = 0.1 } = $$props;
	let { value = 1.0 } = $$props;
	const writable_props = ['min', 'max', 'step', 'value'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Range> was created with unknown prop '${key}'`);
	});

	function input_change_input_handler() {
		value = to_number(this.value);
		$$invalidate(0, value);
	}

	$$self.$$set = $$props => {
		if ('min' in $$props) $$invalidate(1, min = $$props.min);
		if ('max' in $$props) $$invalidate(2, max = $$props.max);
		if ('step' in $$props) $$invalidate(3, step = $$props.step);
		if ('value' in $$props) $$invalidate(0, value = $$props.value);
	};

	$$self.$capture_state = () => ({ min, max, step, value });

	$$self.$inject_state = $$props => {
		if ('min' in $$props) $$invalidate(1, min = $$props.min);
		if ('max' in $$props) $$invalidate(2, max = $$props.max);
		if ('step' in $$props) $$invalidate(3, step = $$props.step);
		if ('value' in $$props) $$invalidate(0, value = $$props.value);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [value, min, max, step, input_change_input_handler];
}

class Range extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$p, create_fragment$p, safe_not_equal, { min: 1, max: 2, step: 3, value: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Range",
			options,
			id: create_fragment$p.name
		});
	}

	get min() {
		throw new Error("<Range>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set min(value) {
		throw new Error("<Range>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get max() {
		throw new Error("<Range>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set max(value) {
		throw new Error("<Range>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get step() {
		throw new Error("<Range>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set step(value) {
		throw new Error("<Range>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get value() {
		throw new Error("<Range>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set value(value) {
		throw new Error("<Range>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

function supressWarnings() {
  const origWarn = console.warn;

  console.warn = (message) => {
    if (message.includes('unknown prop')) return
    if (message.includes('unexpected slot')) return
    origWarn(message);
  };

  onMount(() => {
    console.warn = origWarn;
  });
}

/* node_modules/svelte-markdown/src/Parser.svelte generated by Svelte v3.59.2 */

function get_each_context_5$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[18] = list[i];
	return child_ctx;
}

function get_each_context_4$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[18] = list[i];
	return child_ctx;
}

function get_each_context_1$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[10] = list[i];
	return child_ctx;
}

function get_each_context_2$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[13] = list[i];
	child_ctx[15] = i;
	return child_ctx;
}

function get_each_context_3$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[16] = list[i];
	child_ctx[15] = i;
	return child_ctx;
}

function get_each_context$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[7] = list[i];
	return child_ctx;
}

// (19:2) {#if renderers[type]}
function create_if_block_1$3(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block_2$3, create_if_block_3$2, create_else_block_1$1];
	const if_blocks = [];

	function select_block_type_1(ctx, dirty) {
		if (/*type*/ ctx[0] === 'table') return 0;
		if (/*type*/ ctx[0] === 'list') return 1;
		return 2;
	}

	current_block_type_index = select_block_type_1(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			if_block.c();
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type_1(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$3.name,
		type: "if",
		source: "(19:2) {#if renderers[type]}",
		ctx
	});

	return block;
}

// (14:0) {#if !type}
function create_if_block$5(ctx) {
	let each_1_anchor;
	let current;
	let each_value = /*tokens*/ ctx[1];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	const block = {
		c: function create() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		m: function mount(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(target, anchor);
				}
			}

			insert_dev(target, each_1_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (dirty & /*tokens, renderers*/ 34) {
				each_value = /*tokens*/ ctx[1];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$1(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$1(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o: function outro(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d: function destroy(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(each_1_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$5.name,
		type: "if",
		source: "(14:0) {#if !type}",
		ctx
	});

	return block;
}

// (69:4) {:else}
function create_else_block_1$1(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	const switch_instance_spread_levels = [/*$$restProps*/ ctx[6]];
	var switch_value = /*renderers*/ ctx[5][/*type*/ ctx[0]];

	function switch_props(ctx) {
		let switch_instance_props = {
			$$slots: { default: [create_default_slot_11] },
			$$scope: { ctx }
		};

		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
		}

		return {
			props: switch_instance_props,
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
	}

	const block = {
		c: function create() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (switch_instance) mount_component(switch_instance, target, anchor);
			insert_dev(target, switch_instance_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const switch_instance_changes = (dirty & /*$$restProps*/ 64)
			? get_spread_update(switch_instance_spread_levels, [get_spread_object(/*$$restProps*/ ctx[6])])
			: {};

			if (dirty & /*$$scope, tokens, renderers, $$restProps*/ 8388706) {
				switch_instance_changes.$$scope = { dirty, ctx };
			}

			if (dirty & /*renderers, type*/ 33 && switch_value !== (switch_value = /*renderers*/ ctx[5][/*type*/ ctx[0]])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_1$1.name,
		type: "else",
		source: "(69:4) {:else}",
		ctx
	});

	return block;
}

// (51:30) 
function create_if_block_3$2(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block_4$2, create_else_block$4];
	const if_blocks = [];

	function select_block_type_2(ctx, dirty) {
		if (/*ordered*/ ctx[4]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type_2(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			if_block.c();
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type_2(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_3$2.name,
		type: "if",
		source: "(51:30) ",
		ctx
	});

	return block;
}

// (20:4) {#if type === 'table'}
function create_if_block_2$3(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	var switch_value = /*renderers*/ ctx[5].table;

	function switch_props(ctx) {
		return {
			props: {
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			},
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
	}

	const block = {
		c: function create() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (switch_instance) mount_component(switch_instance, target, anchor);
			insert_dev(target, switch_instance_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const switch_instance_changes = {};

			if (dirty & /*$$scope, renderers, rows, $$restProps, header*/ 8388716) {
				switch_instance_changes.$$scope = { dirty, ctx };
			}

			if (dirty & /*renderers*/ 32 && switch_value !== (switch_value = /*renderers*/ ctx[5].table)) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2$3.name,
		type: "if",
		source: "(20:4) {#if type === 'table'}",
		ctx
	});

	return block;
}

// (73:8) {:else}
function create_else_block_2$1(ctx) {
	let t_value = /*$$restProps*/ ctx[6].raw + "";
	let t;

	const block = {
		c: function create() {
			t = text(t_value);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*$$restProps*/ 64 && t_value !== (t_value = /*$$restProps*/ ctx[6].raw + "")) set_data_dev(t, t_value);
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_2$1.name,
		type: "else",
		source: "(73:8) {:else}",
		ctx
	});

	return block;
}

// (71:8) {#if tokens}
function create_if_block_5$2(ctx) {
	let parser;
	let current;

	parser = new Parser$2({
			props: {
				tokens: /*tokens*/ ctx[1],
				renderers: /*renderers*/ ctx[5]
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(parser.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(parser, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const parser_changes = {};
			if (dirty & /*tokens*/ 2) parser_changes.tokens = /*tokens*/ ctx[1];
			if (dirty & /*renderers*/ 32) parser_changes.renderers = /*renderers*/ ctx[5];
			parser.$set(parser_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(parser.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(parser.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(parser, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_5$2.name,
		type: "if",
		source: "(71:8) {#if tokens}",
		ctx
	});

	return block;
}

// (70:6) <svelte:component this={renderers[type]} {...$$restProps}>
function create_default_slot_11(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block_5$2, create_else_block_2$1];
	const if_blocks = [];

	function select_block_type_3(ctx, dirty) {
		if (/*tokens*/ ctx[1]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type_3(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			if_block.c();
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type_3(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_11.name,
		type: "slot",
		source: "(70:6) <svelte:component this={renderers[type]} {...$$restProps}>",
		ctx
	});

	return block;
}

// (60:6) {:else}
function create_else_block$4(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	const switch_instance_spread_levels = [{ ordered: /*ordered*/ ctx[4] }, /*$$restProps*/ ctx[6]];
	var switch_value = /*renderers*/ ctx[5].list;

	function switch_props(ctx) {
		let switch_instance_props = {
			$$slots: { default: [create_default_slot_9] },
			$$scope: { ctx }
		};

		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
		}

		return {
			props: switch_instance_props,
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
	}

	const block = {
		c: function create() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (switch_instance) mount_component(switch_instance, target, anchor);
			insert_dev(target, switch_instance_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const switch_instance_changes = (dirty & /*ordered, $$restProps*/ 80)
			? get_spread_update(switch_instance_spread_levels, [
					dirty & /*ordered*/ 16 && { ordered: /*ordered*/ ctx[4] },
					dirty & /*$$restProps*/ 64 && get_spread_object(/*$$restProps*/ ctx[6])
				])
			: {};

			if (dirty & /*$$scope, $$restProps, renderers*/ 8388704) {
				switch_instance_changes.$$scope = { dirty, ctx };
			}

			if (dirty & /*renderers*/ 32 && switch_value !== (switch_value = /*renderers*/ ctx[5].list)) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block$4.name,
		type: "else",
		source: "(60:6) {:else}",
		ctx
	});

	return block;
}

// (52:6) {#if ordered}
function create_if_block_4$2(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	const switch_instance_spread_levels = [{ ordered: /*ordered*/ ctx[4] }, /*$$restProps*/ ctx[6]];
	var switch_value = /*renderers*/ ctx[5].list;

	function switch_props(ctx) {
		let switch_instance_props = {
			$$slots: { default: [create_default_slot_7] },
			$$scope: { ctx }
		};

		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
		}

		return {
			props: switch_instance_props,
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
	}

	const block = {
		c: function create() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (switch_instance) mount_component(switch_instance, target, anchor);
			insert_dev(target, switch_instance_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const switch_instance_changes = (dirty & /*ordered, $$restProps*/ 80)
			? get_spread_update(switch_instance_spread_levels, [
					dirty & /*ordered*/ 16 && { ordered: /*ordered*/ ctx[4] },
					dirty & /*$$restProps*/ 64 && get_spread_object(/*$$restProps*/ ctx[6])
				])
			: {};

			if (dirty & /*$$scope, $$restProps, renderers*/ 8388704) {
				switch_instance_changes.$$scope = { dirty, ctx };
			}

			if (dirty & /*renderers*/ 32 && switch_value !== (switch_value = /*renderers*/ ctx[5].list)) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_4$2.name,
		type: "if",
		source: "(52:6) {#if ordered}",
		ctx
	});

	return block;
}

// (63:12) <svelte:component this={renderers.unorderedlistitem || renderers.listitem} {...item}>
function create_default_slot_10(ctx) {
	let parser;
	let t;
	let current;

	parser = new Parser$2({
			props: {
				tokens: /*item*/ ctx[18].tokens,
				renderers: /*renderers*/ ctx[5]
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(parser.$$.fragment);
			t = space();
		},
		m: function mount(target, anchor) {
			mount_component(parser, target, anchor);
			insert_dev(target, t, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const parser_changes = {};
			if (dirty & /*$$restProps*/ 64) parser_changes.tokens = /*item*/ ctx[18].tokens;
			if (dirty & /*renderers*/ 32) parser_changes.renderers = /*renderers*/ ctx[5];
			parser.$set(parser_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(parser.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(parser.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(parser, detaching);
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_10.name,
		type: "slot",
		source: "(63:12) <svelte:component this={renderers.unorderedlistitem || renderers.listitem} {...item}>",
		ctx
	});

	return block;
}

// (62:10) {#each $$restProps.items as item}
function create_each_block_5$1(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	const switch_instance_spread_levels = [/*item*/ ctx[18]];
	var switch_value = /*renderers*/ ctx[5].unorderedlistitem || /*renderers*/ ctx[5].listitem;

	function switch_props(ctx) {
		let switch_instance_props = {
			$$slots: { default: [create_default_slot_10] },
			$$scope: { ctx }
		};

		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
		}

		return {
			props: switch_instance_props,
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
	}

	const block = {
		c: function create() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (switch_instance) mount_component(switch_instance, target, anchor);
			insert_dev(target, switch_instance_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const switch_instance_changes = (dirty & /*$$restProps*/ 64)
			? get_spread_update(switch_instance_spread_levels, [get_spread_object(/*item*/ ctx[18])])
			: {};

			if (dirty & /*$$scope, $$restProps, renderers*/ 8388704) {
				switch_instance_changes.$$scope = { dirty, ctx };
			}

			if (dirty & /*renderers*/ 32 && switch_value !== (switch_value = /*renderers*/ ctx[5].unorderedlistitem || /*renderers*/ ctx[5].listitem)) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_5$1.name,
		type: "each",
		source: "(62:10) {#each $$restProps.items as item}",
		ctx
	});

	return block;
}

// (61:8) <svelte:component this={renderers.list} {ordered} {...$$restProps}>
function create_default_slot_9(ctx) {
	let each_1_anchor;
	let current;
	let each_value_5 = /*$$restProps*/ ctx[6].items;
	validate_each_argument(each_value_5);
	let each_blocks = [];

	for (let i = 0; i < each_value_5.length; i += 1) {
		each_blocks[i] = create_each_block_5$1(get_each_context_5$1(ctx, each_value_5, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	const block = {
		c: function create() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		m: function mount(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(target, anchor);
				}
			}

			insert_dev(target, each_1_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (dirty & /*renderers, $$restProps*/ 96) {
				each_value_5 = /*$$restProps*/ ctx[6].items;
				validate_each_argument(each_value_5);
				let i;

				for (i = 0; i < each_value_5.length; i += 1) {
					const child_ctx = get_each_context_5$1(ctx, each_value_5, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block_5$1(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				group_outros();

				for (i = each_value_5.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;

			for (let i = 0; i < each_value_5.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o: function outro(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d: function destroy(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(each_1_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_9.name,
		type: "slot",
		source: "(61:8) <svelte:component this={renderers.list} {ordered} {...$$restProps}>",
		ctx
	});

	return block;
}

// (55:12) <svelte:component this={renderers.orderedlistitem || renderers.listitem} {...item}>
function create_default_slot_8(ctx) {
	let parser;
	let t;
	let current;

	parser = new Parser$2({
			props: {
				tokens: /*item*/ ctx[18].tokens,
				renderers: /*renderers*/ ctx[5]
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(parser.$$.fragment);
			t = space();
		},
		m: function mount(target, anchor) {
			mount_component(parser, target, anchor);
			insert_dev(target, t, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const parser_changes = {};
			if (dirty & /*$$restProps*/ 64) parser_changes.tokens = /*item*/ ctx[18].tokens;
			if (dirty & /*renderers*/ 32) parser_changes.renderers = /*renderers*/ ctx[5];
			parser.$set(parser_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(parser.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(parser.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(parser, detaching);
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_8.name,
		type: "slot",
		source: "(55:12) <svelte:component this={renderers.orderedlistitem || renderers.listitem} {...item}>",
		ctx
	});

	return block;
}

// (54:10) {#each $$restProps.items as item}
function create_each_block_4$1(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	const switch_instance_spread_levels = [/*item*/ ctx[18]];
	var switch_value = /*renderers*/ ctx[5].orderedlistitem || /*renderers*/ ctx[5].listitem;

	function switch_props(ctx) {
		let switch_instance_props = {
			$$slots: { default: [create_default_slot_8] },
			$$scope: { ctx }
		};

		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
		}

		return {
			props: switch_instance_props,
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
	}

	const block = {
		c: function create() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (switch_instance) mount_component(switch_instance, target, anchor);
			insert_dev(target, switch_instance_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const switch_instance_changes = (dirty & /*$$restProps*/ 64)
			? get_spread_update(switch_instance_spread_levels, [get_spread_object(/*item*/ ctx[18])])
			: {};

			if (dirty & /*$$scope, $$restProps, renderers*/ 8388704) {
				switch_instance_changes.$$scope = { dirty, ctx };
			}

			if (dirty & /*renderers*/ 32 && switch_value !== (switch_value = /*renderers*/ ctx[5].orderedlistitem || /*renderers*/ ctx[5].listitem)) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_4$1.name,
		type: "each",
		source: "(54:10) {#each $$restProps.items as item}",
		ctx
	});

	return block;
}

// (53:8) <svelte:component this={renderers.list} {ordered} {...$$restProps}>
function create_default_slot_7(ctx) {
	let each_1_anchor;
	let current;
	let each_value_4 = /*$$restProps*/ ctx[6].items;
	validate_each_argument(each_value_4);
	let each_blocks = [];

	for (let i = 0; i < each_value_4.length; i += 1) {
		each_blocks[i] = create_each_block_4$1(get_each_context_4$1(ctx, each_value_4, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	const block = {
		c: function create() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		m: function mount(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(target, anchor);
				}
			}

			insert_dev(target, each_1_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (dirty & /*renderers, $$restProps*/ 96) {
				each_value_4 = /*$$restProps*/ ctx[6].items;
				validate_each_argument(each_value_4);
				let i;

				for (i = 0; i < each_value_4.length; i += 1) {
					const child_ctx = get_each_context_4$1(ctx, each_value_4, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block_4$1(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				group_outros();

				for (i = each_value_4.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;

			for (let i = 0; i < each_value_4.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o: function outro(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d: function destroy(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(each_1_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_7.name,
		type: "slot",
		source: "(53:8) <svelte:component this={renderers.list} {ordered} {...$$restProps}>",
		ctx
	});

	return block;
}

// (25:14) <svelte:component                 this={renderers.tablecell}                 header={true}                 align={$$restProps.align[i] || 'center'}                 >
function create_default_slot_6(ctx) {
	let parser;
	let t;
	let current;

	parser = new Parser$2({
			props: {
				tokens: /*headerItem*/ ctx[16].tokens,
				renderers: /*renderers*/ ctx[5]
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(parser.$$.fragment);
			t = space();
		},
		m: function mount(target, anchor) {
			mount_component(parser, target, anchor);
			insert_dev(target, t, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const parser_changes = {};
			if (dirty & /*header*/ 4) parser_changes.tokens = /*headerItem*/ ctx[16].tokens;
			if (dirty & /*renderers*/ 32) parser_changes.renderers = /*renderers*/ ctx[5];
			parser.$set(parser_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(parser.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(parser.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(parser, detaching);
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_6.name,
		type: "slot",
		source: "(25:14) <svelte:component                 this={renderers.tablecell}                 header={true}                 align={$$restProps.align[i] || 'center'}                 >",
		ctx
	});

	return block;
}

// (24:12) {#each header as headerItem, i}
function create_each_block_3$1(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	var switch_value = /*renderers*/ ctx[5].tablecell;

	function switch_props(ctx) {
		return {
			props: {
				header: true,
				align: /*$$restProps*/ ctx[6].align[/*i*/ ctx[15]] || 'center',
				$$slots: { default: [create_default_slot_6] },
				$$scope: { ctx }
			},
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
	}

	const block = {
		c: function create() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (switch_instance) mount_component(switch_instance, target, anchor);
			insert_dev(target, switch_instance_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const switch_instance_changes = {};
			if (dirty & /*$$restProps*/ 64) switch_instance_changes.align = /*$$restProps*/ ctx[6].align[/*i*/ ctx[15]] || 'center';

			if (dirty & /*$$scope, header, renderers*/ 8388644) {
				switch_instance_changes.$$scope = { dirty, ctx };
			}

			if (dirty & /*renderers*/ 32 && switch_value !== (switch_value = /*renderers*/ ctx[5].tablecell)) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_3$1.name,
		type: "each",
		source: "(24:12) {#each header as headerItem, i}",
		ctx
	});

	return block;
}

// (23:10) <svelte:component this={renderers.tablerow}>
function create_default_slot_5(ctx) {
	let each_1_anchor;
	let current;
	let each_value_3 = /*header*/ ctx[2];
	validate_each_argument(each_value_3);
	let each_blocks = [];

	for (let i = 0; i < each_value_3.length; i += 1) {
		each_blocks[i] = create_each_block_3$1(get_each_context_3$1(ctx, each_value_3, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	const block = {
		c: function create() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		m: function mount(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(target, anchor);
				}
			}

			insert_dev(target, each_1_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (dirty & /*renderers, $$restProps, header*/ 100) {
				each_value_3 = /*header*/ ctx[2];
				validate_each_argument(each_value_3);
				let i;

				for (i = 0; i < each_value_3.length; i += 1) {
					const child_ctx = get_each_context_3$1(ctx, each_value_3, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block_3$1(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				group_outros();

				for (i = each_value_3.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;

			for (let i = 0; i < each_value_3.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o: function outro(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d: function destroy(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(each_1_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_5.name,
		type: "slot",
		source: "(23:10) <svelte:component this={renderers.tablerow}>",
		ctx
	});

	return block;
}

// (22:8) <svelte:component this={renderers.tablehead}>
function create_default_slot_4(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	var switch_value = /*renderers*/ ctx[5].tablerow;

	function switch_props(ctx) {
		return {
			props: {
				$$slots: { default: [create_default_slot_5] },
				$$scope: { ctx }
			},
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
	}

	const block = {
		c: function create() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (switch_instance) mount_component(switch_instance, target, anchor);
			insert_dev(target, switch_instance_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const switch_instance_changes = {};

			if (dirty & /*$$scope, header, renderers, $$restProps*/ 8388708) {
				switch_instance_changes.$$scope = { dirty, ctx };
			}

			if (dirty & /*renderers*/ 32 && switch_value !== (switch_value = /*renderers*/ ctx[5].tablerow)) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_4.name,
		type: "slot",
		source: "(22:8) <svelte:component this={renderers.tablehead}>",
		ctx
	});

	return block;
}

// (39:16) <svelte:component                   this={renderers.tablecell}                   header={false}                   align={$$restProps.align[i] || 'center'}                   >
function create_default_slot_3(ctx) {
	let parser;
	let current;

	parser = new Parser$2({
			props: {
				tokens: /*cells*/ ctx[13].tokens,
				renderers: /*renderers*/ ctx[5]
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(parser.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(parser, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const parser_changes = {};
			if (dirty & /*rows*/ 8) parser_changes.tokens = /*cells*/ ctx[13].tokens;
			if (dirty & /*renderers*/ 32) parser_changes.renderers = /*renderers*/ ctx[5];
			parser.$set(parser_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(parser.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(parser.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(parser, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_3.name,
		type: "slot",
		source: "(39:16) <svelte:component                   this={renderers.tablecell}                   header={false}                   align={$$restProps.align[i] || 'center'}                   >",
		ctx
	});

	return block;
}

// (38:14) {#each row as cells, i}
function create_each_block_2$1(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	var switch_value = /*renderers*/ ctx[5].tablecell;

	function switch_props(ctx) {
		return {
			props: {
				header: false,
				align: /*$$restProps*/ ctx[6].align[/*i*/ ctx[15]] || 'center',
				$$slots: { default: [create_default_slot_3] },
				$$scope: { ctx }
			},
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
	}

	const block = {
		c: function create() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (switch_instance) mount_component(switch_instance, target, anchor);
			insert_dev(target, switch_instance_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const switch_instance_changes = {};
			if (dirty & /*$$restProps*/ 64) switch_instance_changes.align = /*$$restProps*/ ctx[6].align[/*i*/ ctx[15]] || 'center';

			if (dirty & /*$$scope, rows, renderers*/ 8388648) {
				switch_instance_changes.$$scope = { dirty, ctx };
			}

			if (dirty & /*renderers*/ 32 && switch_value !== (switch_value = /*renderers*/ ctx[5].tablecell)) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_2$1.name,
		type: "each",
		source: "(38:14) {#each row as cells, i}",
		ctx
	});

	return block;
}

// (37:12) <svelte:component this={renderers.tablerow}>
function create_default_slot_2(ctx) {
	let t;
	let current;
	let each_value_2 = /*row*/ ctx[10];
	validate_each_argument(each_value_2);
	let each_blocks = [];

	for (let i = 0; i < each_value_2.length; i += 1) {
		each_blocks[i] = create_each_block_2$1(get_each_context_2$1(ctx, each_value_2, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	const block = {
		c: function create() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t = space();
		},
		m: function mount(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(target, anchor);
				}
			}

			insert_dev(target, t, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (dirty & /*renderers, $$restProps, rows*/ 104) {
				each_value_2 = /*row*/ ctx[10];
				validate_each_argument(each_value_2);
				let i;

				for (i = 0; i < each_value_2.length; i += 1) {
					const child_ctx = get_each_context_2$1(ctx, each_value_2, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block_2$1(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(t.parentNode, t);
					}
				}

				group_outros();

				for (i = each_value_2.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;

			for (let i = 0; i < each_value_2.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o: function outro(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d: function destroy(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_2.name,
		type: "slot",
		source: "(37:12) <svelte:component this={renderers.tablerow}>",
		ctx
	});

	return block;
}

// (36:10) {#each rows as row}
function create_each_block_1$1(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	var switch_value = /*renderers*/ ctx[5].tablerow;

	function switch_props(ctx) {
		return {
			props: {
				$$slots: { default: [create_default_slot_2] },
				$$scope: { ctx }
			},
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
	}

	const block = {
		c: function create() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (switch_instance) mount_component(switch_instance, target, anchor);
			insert_dev(target, switch_instance_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const switch_instance_changes = {};

			if (dirty & /*$$scope, rows, renderers, $$restProps*/ 8388712) {
				switch_instance_changes.$$scope = { dirty, ctx };
			}

			if (dirty & /*renderers*/ 32 && switch_value !== (switch_value = /*renderers*/ ctx[5].tablerow)) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_1$1.name,
		type: "each",
		source: "(36:10) {#each rows as row}",
		ctx
	});

	return block;
}

// (35:8) <svelte:component this={renderers.tablebody}>
function create_default_slot_1(ctx) {
	let each_1_anchor;
	let current;
	let each_value_1 = /*rows*/ ctx[3];
	validate_each_argument(each_value_1);
	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	const block = {
		c: function create() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		m: function mount(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(target, anchor);
				}
			}

			insert_dev(target, each_1_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (dirty & /*renderers, rows, $$restProps*/ 104) {
				each_value_1 = /*rows*/ ctx[3];
				validate_each_argument(each_value_1);
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1$1(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block_1$1(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				group_outros();

				for (i = each_value_1.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;

			for (let i = 0; i < each_value_1.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o: function outro(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d: function destroy(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(each_1_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_1.name,
		type: "slot",
		source: "(35:8) <svelte:component this={renderers.tablebody}>",
		ctx
	});

	return block;
}

// (21:6) <svelte:component this={renderers.table}>
function create_default_slot(ctx) {
	let switch_instance0;
	let t;
	let switch_instance1;
	let switch_instance1_anchor;
	let current;
	var switch_value = /*renderers*/ ctx[5].tablehead;

	function switch_props(ctx) {
		return {
			props: {
				$$slots: { default: [create_default_slot_4] },
				$$scope: { ctx }
			},
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance0 = construct_svelte_component_dev(switch_value, switch_props(ctx));
	}

	var switch_value_1 = /*renderers*/ ctx[5].tablebody;

	function switch_props_1(ctx) {
		return {
			props: {
				$$slots: { default: [create_default_slot_1] },
				$$scope: { ctx }
			},
			$$inline: true
		};
	}

	if (switch_value_1) {
		switch_instance1 = construct_svelte_component_dev(switch_value_1, switch_props_1(ctx));
	}

	const block = {
		c: function create() {
			if (switch_instance0) create_component(switch_instance0.$$.fragment);
			t = space();
			if (switch_instance1) create_component(switch_instance1.$$.fragment);
			switch_instance1_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (switch_instance0) mount_component(switch_instance0, target, anchor);
			insert_dev(target, t, anchor);
			if (switch_instance1) mount_component(switch_instance1, target, anchor);
			insert_dev(target, switch_instance1_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const switch_instance0_changes = {};

			if (dirty & /*$$scope, renderers, header, $$restProps*/ 8388708) {
				switch_instance0_changes.$$scope = { dirty, ctx };
			}

			if (dirty & /*renderers*/ 32 && switch_value !== (switch_value = /*renderers*/ ctx[5].tablehead)) {
				if (switch_instance0) {
					group_outros();
					const old_component = switch_instance0;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance0 = construct_svelte_component_dev(switch_value, switch_props(ctx));
					create_component(switch_instance0.$$.fragment);
					transition_in(switch_instance0.$$.fragment, 1);
					mount_component(switch_instance0, t.parentNode, t);
				} else {
					switch_instance0 = null;
				}
			} else if (switch_value) {
				switch_instance0.$set(switch_instance0_changes);
			}

			const switch_instance1_changes = {};

			if (dirty & /*$$scope, rows, renderers, $$restProps*/ 8388712) {
				switch_instance1_changes.$$scope = { dirty, ctx };
			}

			if (dirty & /*renderers*/ 32 && switch_value_1 !== (switch_value_1 = /*renderers*/ ctx[5].tablebody)) {
				if (switch_instance1) {
					group_outros();
					const old_component = switch_instance1;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value_1) {
					switch_instance1 = construct_svelte_component_dev(switch_value_1, switch_props_1(ctx));
					create_component(switch_instance1.$$.fragment);
					transition_in(switch_instance1.$$.fragment, 1);
					mount_component(switch_instance1, switch_instance1_anchor.parentNode, switch_instance1_anchor);
				} else {
					switch_instance1 = null;
				}
			} else if (switch_value_1) {
				switch_instance1.$set(switch_instance1_changes);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance0) transition_in(switch_instance0.$$.fragment, local);
			if (switch_instance1) transition_in(switch_instance1.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance0) transition_out(switch_instance0.$$.fragment, local);
			if (switch_instance1) transition_out(switch_instance1.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (switch_instance0) destroy_component(switch_instance0, detaching);
			if (detaching) detach_dev(t);
			if (detaching) detach_dev(switch_instance1_anchor);
			if (switch_instance1) destroy_component(switch_instance1, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot.name,
		type: "slot",
		source: "(21:6) <svelte:component this={renderers.table}>",
		ctx
	});

	return block;
}

// (15:2) {#each tokens as token}
function create_each_block$1(ctx) {
	let parser;
	let current;
	const parser_spread_levels = [/*token*/ ctx[7], { renderers: /*renderers*/ ctx[5] }];
	let parser_props = {};

	for (let i = 0; i < parser_spread_levels.length; i += 1) {
		parser_props = assign(parser_props, parser_spread_levels[i]);
	}

	parser = new Parser$2({ props: parser_props, $$inline: true });

	const block = {
		c: function create() {
			create_component(parser.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(parser, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const parser_changes = (dirty & /*tokens, renderers*/ 34)
			? get_spread_update(parser_spread_levels, [
					dirty & /*tokens*/ 2 && get_spread_object(/*token*/ ctx[7]),
					dirty & /*renderers*/ 32 && { renderers: /*renderers*/ ctx[5] }
				])
			: {};

			parser.$set(parser_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(parser.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(parser.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(parser, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$1.name,
		type: "each",
		source: "(15:2) {#each tokens as token}",
		ctx
	});

	return block;
}

function create_fragment$o(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block$5, create_if_block_1$3];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (!/*type*/ ctx[0]) return 0;
		if (/*renderers*/ ctx[5][/*type*/ ctx[0]]) return 1;
		return -1;
	}

	if (~(current_block_type_index = select_block_type(ctx))) {
		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	}

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if (~current_block_type_index) {
				if_blocks[current_block_type_index].m(target, anchor);
			}

			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if (~current_block_type_index) {
					if_blocks[current_block_type_index].p(ctx, dirty);
				}
			} else {
				if (if_block) {
					group_outros();

					transition_out(if_blocks[previous_block_index], 1, 1, () => {
						if_blocks[previous_block_index] = null;
					});

					check_outros();
				}

				if (~current_block_type_index) {
					if_block = if_blocks[current_block_type_index];

					if (!if_block) {
						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
						if_block.c();
					} else {
						if_block.p(ctx, dirty);
					}

					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				} else {
					if_block = null;
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (~current_block_type_index) {
				if_blocks[current_block_type_index].d(detaching);
			}

			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$o.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$o($$self, $$props, $$invalidate) {
	const omit_props_names = ["type","tokens","header","rows","ordered","renderers"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Parser', slots, []);
	let { type = undefined } = $$props;
	let { tokens = undefined } = $$props;
	let { header = undefined } = $$props;
	let { rows = undefined } = $$props;
	let { ordered = false } = $$props;
	let { renderers } = $$props;
	supressWarnings();

	$$self.$$.on_mount.push(function () {
		if (renderers === undefined && !('renderers' in $$props || $$self.$$.bound[$$self.$$.props['renderers']])) {
			console.warn("<Parser> was created without expected prop 'renderers'");
		}
	});

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(6, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('type' in $$new_props) $$invalidate(0, type = $$new_props.type);
		if ('tokens' in $$new_props) $$invalidate(1, tokens = $$new_props.tokens);
		if ('header' in $$new_props) $$invalidate(2, header = $$new_props.header);
		if ('rows' in $$new_props) $$invalidate(3, rows = $$new_props.rows);
		if ('ordered' in $$new_props) $$invalidate(4, ordered = $$new_props.ordered);
		if ('renderers' in $$new_props) $$invalidate(5, renderers = $$new_props.renderers);
	};

	$$self.$capture_state = () => ({
		supressWarnings,
		type,
		tokens,
		header,
		rows,
		ordered,
		renderers
	});

	$$self.$inject_state = $$new_props => {
		if ('type' in $$props) $$invalidate(0, type = $$new_props.type);
		if ('tokens' in $$props) $$invalidate(1, tokens = $$new_props.tokens);
		if ('header' in $$props) $$invalidate(2, header = $$new_props.header);
		if ('rows' in $$props) $$invalidate(3, rows = $$new_props.rows);
		if ('ordered' in $$props) $$invalidate(4, ordered = $$new_props.ordered);
		if ('renderers' in $$props) $$invalidate(5, renderers = $$new_props.renderers);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [type, tokens, header, rows, ordered, renderers, $$restProps];
}

let Parser$2 = class Parser extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$1(this, options, instance$o, create_fragment$o, safe_not_equal, {
			type: 0,
			tokens: 1,
			header: 2,
			rows: 3,
			ordered: 4,
			renderers: 5
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Parser",
			options,
			id: create_fragment$o.name
		});
	}

	get type() {
		throw new Error("<Parser>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set type(value) {
		throw new Error("<Parser>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get tokens() {
		throw new Error("<Parser>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set tokens(value) {
		throw new Error("<Parser>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get header() {
		throw new Error("<Parser>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set header(value) {
		throw new Error("<Parser>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get rows() {
		throw new Error("<Parser>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set rows(value) {
		throw new Error("<Parser>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get ordered() {
		throw new Error("<Parser>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set ordered(value) {
		throw new Error("<Parser>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get renderers() {
		throw new Error("<Parser>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set renderers(value) {
		throw new Error("<Parser>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
};

/**
 * marked v4.3.0 - a markdown parser
 * Copyright (c) 2011-2023, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/markedjs/marked
 */

/**
 * DO NOT EDIT THIS FILE
 * The code in this file is generated from files in ./src/
 */

function getDefaults() {
  return {
    async: false,
    baseUrl: null,
    breaks: false,
    extensions: null,
    gfm: true,
    headerIds: true,
    headerPrefix: '',
    highlight: null,
    hooks: null,
    langPrefix: 'language-',
    mangle: true,
    pedantic: false,
    renderer: null,
    sanitize: false,
    sanitizer: null,
    silent: false,
    smartypants: false,
    tokenizer: null,
    walkTokens: null,
    xhtml: false
  };
}

let defaults = getDefaults();

function changeDefaults(newDefaults) {
  defaults = newDefaults;
}

/**
 * Helpers
 */
const escapeTest = /[&<>"']/;
const escapeReplace = new RegExp(escapeTest.source, 'g');
const escapeTestNoEncode = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/;
const escapeReplaceNoEncode = new RegExp(escapeTestNoEncode.source, 'g');
const escapeReplacements = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};
const getEscapeReplacement = (ch) => escapeReplacements[ch];
function escape(html, encode) {
  if (encode) {
    if (escapeTest.test(html)) {
      return html.replace(escapeReplace, getEscapeReplacement);
    }
  } else {
    if (escapeTestNoEncode.test(html)) {
      return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
    }
  }

  return html;
}

const unescapeTest = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;

/**
 * @param {string} html
 */
function unescape(html) {
  // explicitly match decimal, hex, and named HTML entities
  return html.replace(unescapeTest, (_, n) => {
    n = n.toLowerCase();
    if (n === 'colon') return ':';
    if (n.charAt(0) === '#') {
      return n.charAt(1) === 'x'
        ? String.fromCharCode(parseInt(n.substring(2), 16))
        : String.fromCharCode(+n.substring(1));
    }
    return '';
  });
}

const caret = /(^|[^\[])\^/g;

/**
 * @param {string | RegExp} regex
 * @param {string} opt
 */
function edit(regex, opt) {
  regex = typeof regex === 'string' ? regex : regex.source;
  opt = opt || '';
  const obj = {
    replace: (name, val) => {
      val = val.source || val;
      val = val.replace(caret, '$1');
      regex = regex.replace(name, val);
      return obj;
    },
    getRegex: () => {
      return new RegExp(regex, opt);
    }
  };
  return obj;
}

const nonWordAndColonTest = /[^\w:]/g;
const originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;

/**
 * @param {boolean} sanitize
 * @param {string} base
 * @param {string} href
 */
function cleanUrl(sanitize, base, href) {
  if (sanitize) {
    let prot;
    try {
      prot = decodeURIComponent(unescape(href))
        .replace(nonWordAndColonTest, '')
        .toLowerCase();
    } catch (e) {
      return null;
    }
    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0 || prot.indexOf('data:') === 0) {
      return null;
    }
  }
  if (base && !originIndependentUrl.test(href)) {
    href = resolveUrl(base, href);
  }
  try {
    href = encodeURI(href).replace(/%25/g, '%');
  } catch (e) {
    return null;
  }
  return href;
}

const baseUrls = {};
const justDomain = /^[^:]+:\/*[^/]*$/;
const protocol = /^([^:]+:)[\s\S]*$/;
const domain = /^([^:]+:\/*[^/]*)[\s\S]*$/;

/**
 * @param {string} base
 * @param {string} href
 */
function resolveUrl(base, href) {
  if (!baseUrls[' ' + base]) {
    // we can ignore everything in base after the last slash of its path component,
    // but we might need to add _that_
    // https://tools.ietf.org/html/rfc3986#section-3
    if (justDomain.test(base)) {
      baseUrls[' ' + base] = base + '/';
    } else {
      baseUrls[' ' + base] = rtrim(base, '/', true);
    }
  }
  base = baseUrls[' ' + base];
  const relativeBase = base.indexOf(':') === -1;

  if (href.substring(0, 2) === '//') {
    if (relativeBase) {
      return href;
    }
    return base.replace(protocol, '$1') + href;
  } else if (href.charAt(0) === '/') {
    if (relativeBase) {
      return href;
    }
    return base.replace(domain, '$1') + href;
  } else {
    return base + href;
  }
}

const noopTest = { exec: function noopTest() {} };

function splitCells(tableRow, count) {
  // ensure that every cell-delimiting pipe has a space
  // before it to distinguish it from an escaped pipe
  const row = tableRow.replace(/\|/g, (match, offset, str) => {
      let escaped = false,
        curr = offset;
      while (--curr >= 0 && str[curr] === '\\') escaped = !escaped;
      if (escaped) {
        // odd number of slashes means | is escaped
        // so we leave it alone
        return '|';
      } else {
        // add space before unescaped |
        return ' |';
      }
    }),
    cells = row.split(/ \|/);
  let i = 0;

  // First/last cell in a row cannot be empty if it has no leading/trailing pipe
  if (!cells[0].trim()) { cells.shift(); }
  if (cells.length > 0 && !cells[cells.length - 1].trim()) { cells.pop(); }

  if (cells.length > count) {
    cells.splice(count);
  } else {
    while (cells.length < count) cells.push('');
  }

  for (; i < cells.length; i++) {
    // leading or trailing whitespace is ignored per the gfm spec
    cells[i] = cells[i].trim().replace(/\\\|/g, '|');
  }
  return cells;
}

/**
 * Remove trailing 'c's. Equivalent to str.replace(/c*$/, '').
 * /c*$/ is vulnerable to REDOS.
 *
 * @param {string} str
 * @param {string} c
 * @param {boolean} invert Remove suffix of non-c chars instead. Default falsey.
 */
function rtrim(str, c, invert) {
  const l = str.length;
  if (l === 0) {
    return '';
  }

  // Length of suffix matching the invert condition.
  let suffLen = 0;

  // Step left until we fail to match the invert condition.
  while (suffLen < l) {
    const currChar = str.charAt(l - suffLen - 1);
    if (currChar === c && !invert) {
      suffLen++;
    } else if (currChar !== c && invert) {
      suffLen++;
    } else {
      break;
    }
  }

  return str.slice(0, l - suffLen);
}

function findClosingBracket(str, b) {
  if (str.indexOf(b[1]) === -1) {
    return -1;
  }
  const l = str.length;
  let level = 0,
    i = 0;
  for (; i < l; i++) {
    if (str[i] === '\\') {
      i++;
    } else if (str[i] === b[0]) {
      level++;
    } else if (str[i] === b[1]) {
      level--;
      if (level < 0) {
        return i;
      }
    }
  }
  return -1;
}

function checkSanitizeDeprecation(opt) {
  if (opt && opt.sanitize && !opt.silent) {
    console.warn('marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options');
  }
}

// copied from https://stackoverflow.com/a/5450113/806777
/**
 * @param {string} pattern
 * @param {number} count
 */
function repeatString(pattern, count) {
  if (count < 1) {
    return '';
  }
  let result = '';
  while (count > 1) {
    if (count & 1) {
      result += pattern;
    }
    count >>= 1;
    pattern += pattern;
  }
  return result + pattern;
}

function outputLink(cap, link, raw, lexer) {
  const href = link.href;
  const title = link.title ? escape(link.title) : null;
  const text = cap[1].replace(/\\([\[\]])/g, '$1');

  if (cap[0].charAt(0) !== '!') {
    lexer.state.inLink = true;
    const token = {
      type: 'link',
      raw,
      href,
      title,
      text,
      tokens: lexer.inlineTokens(text)
    };
    lexer.state.inLink = false;
    return token;
  }
  return {
    type: 'image',
    raw,
    href,
    title,
    text: escape(text)
  };
}

function indentCodeCompensation(raw, text) {
  const matchIndentToCode = raw.match(/^(\s+)(?:```)/);

  if (matchIndentToCode === null) {
    return text;
  }

  const indentToCode = matchIndentToCode[1];

  return text
    .split('\n')
    .map(node => {
      const matchIndentInNode = node.match(/^\s+/);
      if (matchIndentInNode === null) {
        return node;
      }

      const [indentInNode] = matchIndentInNode;

      if (indentInNode.length >= indentToCode.length) {
        return node.slice(indentToCode.length);
      }

      return node;
    })
    .join('\n');
}

/**
 * Tokenizer
 */
class Tokenizer {
  constructor(options) {
    this.options = options || defaults;
  }

  space(src) {
    const cap = this.rules.block.newline.exec(src);
    if (cap && cap[0].length > 0) {
      return {
        type: 'space',
        raw: cap[0]
      };
    }
  }

  code(src) {
    const cap = this.rules.block.code.exec(src);
    if (cap) {
      const text = cap[0].replace(/^ {1,4}/gm, '');
      return {
        type: 'code',
        raw: cap[0],
        codeBlockStyle: 'indented',
        text: !this.options.pedantic
          ? rtrim(text, '\n')
          : text
      };
    }
  }

  fences(src) {
    const cap = this.rules.block.fences.exec(src);
    if (cap) {
      const raw = cap[0];
      const text = indentCodeCompensation(raw, cap[3] || '');

      return {
        type: 'code',
        raw,
        lang: cap[2] ? cap[2].trim().replace(this.rules.inline._escapes, '$1') : cap[2],
        text
      };
    }
  }

  heading(src) {
    const cap = this.rules.block.heading.exec(src);
    if (cap) {
      let text = cap[2].trim();

      // remove trailing #s
      if (/#$/.test(text)) {
        const trimmed = rtrim(text, '#');
        if (this.options.pedantic) {
          text = trimmed.trim();
        } else if (!trimmed || / $/.test(trimmed)) {
          // CommonMark requires space before trailing #s
          text = trimmed.trim();
        }
      }

      return {
        type: 'heading',
        raw: cap[0],
        depth: cap[1].length,
        text,
        tokens: this.lexer.inline(text)
      };
    }
  }

  hr(src) {
    const cap = this.rules.block.hr.exec(src);
    if (cap) {
      return {
        type: 'hr',
        raw: cap[0]
      };
    }
  }

  blockquote(src) {
    const cap = this.rules.block.blockquote.exec(src);
    if (cap) {
      const text = cap[0].replace(/^ *>[ \t]?/gm, '');
      const top = this.lexer.state.top;
      this.lexer.state.top = true;
      const tokens = this.lexer.blockTokens(text);
      this.lexer.state.top = top;
      return {
        type: 'blockquote',
        raw: cap[0],
        tokens,
        text
      };
    }
  }

  list(src) {
    let cap = this.rules.block.list.exec(src);
    if (cap) {
      let raw, istask, ischecked, indent, i, blankLine, endsWithBlankLine,
        line, nextLine, rawLine, itemContents, endEarly;

      let bull = cap[1].trim();
      const isordered = bull.length > 1;

      const list = {
        type: 'list',
        raw: '',
        ordered: isordered,
        start: isordered ? +bull.slice(0, -1) : '',
        loose: false,
        items: []
      };

      bull = isordered ? `\\d{1,9}\\${bull.slice(-1)}` : `\\${bull}`;

      if (this.options.pedantic) {
        bull = isordered ? bull : '[*+-]';
      }

      // Get next list item
      const itemRegex = new RegExp(`^( {0,3}${bull})((?:[\t ][^\\n]*)?(?:\\n|$))`);

      // Check if current bullet point can start a new List Item
      while (src) {
        endEarly = false;
        if (!(cap = itemRegex.exec(src))) {
          break;
        }

        if (this.rules.block.hr.test(src)) { // End list if bullet was actually HR (possibly move into itemRegex?)
          break;
        }

        raw = cap[0];
        src = src.substring(raw.length);

        line = cap[2].split('\n', 1)[0].replace(/^\t+/, (t) => ' '.repeat(3 * t.length));
        nextLine = src.split('\n', 1)[0];

        if (this.options.pedantic) {
          indent = 2;
          itemContents = line.trimLeft();
        } else {
          indent = cap[2].search(/[^ ]/); // Find first non-space char
          indent = indent > 4 ? 1 : indent; // Treat indented code blocks (> 4 spaces) as having only 1 indent
          itemContents = line.slice(indent);
          indent += cap[1].length;
        }

        blankLine = false;

        if (!line && /^ *$/.test(nextLine)) { // Items begin with at most one blank line
          raw += nextLine + '\n';
          src = src.substring(nextLine.length + 1);
          endEarly = true;
        }

        if (!endEarly) {
          const nextBulletRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ \t][^\\n]*)?(?:\\n|$))`);
          const hrRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`);
          const fencesBeginRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:\`\`\`|~~~)`);
          const headingBeginRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}#`);

          // Check if following lines should be included in List Item
          while (src) {
            rawLine = src.split('\n', 1)[0];
            nextLine = rawLine;

            // Re-align to follow commonmark nesting rules
            if (this.options.pedantic) {
              nextLine = nextLine.replace(/^ {1,4}(?=( {4})*[^ ])/g, '  ');
            }

            // End list item if found code fences
            if (fencesBeginRegex.test(nextLine)) {
              break;
            }

            // End list item if found start of new heading
            if (headingBeginRegex.test(nextLine)) {
              break;
            }

            // End list item if found start of new bullet
            if (nextBulletRegex.test(nextLine)) {
              break;
            }

            // Horizontal rule found
            if (hrRegex.test(src)) {
              break;
            }

            if (nextLine.search(/[^ ]/) >= indent || !nextLine.trim()) { // Dedent if possible
              itemContents += '\n' + nextLine.slice(indent);
            } else {
              // not enough indentation
              if (blankLine) {
                break;
              }

              // paragraph continuation unless last line was a different block level element
              if (line.search(/[^ ]/) >= 4) { // indented code block
                break;
              }
              if (fencesBeginRegex.test(line)) {
                break;
              }
              if (headingBeginRegex.test(line)) {
                break;
              }
              if (hrRegex.test(line)) {
                break;
              }

              itemContents += '\n' + nextLine;
            }

            if (!blankLine && !nextLine.trim()) { // Check if current line is blank
              blankLine = true;
            }

            raw += rawLine + '\n';
            src = src.substring(rawLine.length + 1);
            line = nextLine.slice(indent);
          }
        }

        if (!list.loose) {
          // If the previous item ended with a blank line, the list is loose
          if (endsWithBlankLine) {
            list.loose = true;
          } else if (/\n *\n *$/.test(raw)) {
            endsWithBlankLine = true;
          }
        }

        // Check for task list items
        if (this.options.gfm) {
          istask = /^\[[ xX]\] /.exec(itemContents);
          if (istask) {
            ischecked = istask[0] !== '[ ] ';
            itemContents = itemContents.replace(/^\[[ xX]\] +/, '');
          }
        }

        list.items.push({
          type: 'list_item',
          raw,
          task: !!istask,
          checked: ischecked,
          loose: false,
          text: itemContents
        });

        list.raw += raw;
      }

      // Do not consume newlines at end of final item. Alternatively, make itemRegex *start* with any newlines to simplify/speed up endsWithBlankLine logic
      list.items[list.items.length - 1].raw = raw.trimRight();
      list.items[list.items.length - 1].text = itemContents.trimRight();
      list.raw = list.raw.trimRight();

      const l = list.items.length;

      // Item child tokens handled here at end because we needed to have the final item to trim it first
      for (i = 0; i < l; i++) {
        this.lexer.state.top = false;
        list.items[i].tokens = this.lexer.blockTokens(list.items[i].text, []);

        if (!list.loose) {
          // Check if list should be loose
          const spacers = list.items[i].tokens.filter(t => t.type === 'space');
          const hasMultipleLineBreaks = spacers.length > 0 && spacers.some(t => /\n.*\n/.test(t.raw));

          list.loose = hasMultipleLineBreaks;
        }
      }

      // Set all items to loose if list is loose
      if (list.loose) {
        for (i = 0; i < l; i++) {
          list.items[i].loose = true;
        }
      }

      return list;
    }
  }

  html(src) {
    const cap = this.rules.block.html.exec(src);
    if (cap) {
      const token = {
        type: 'html',
        raw: cap[0],
        pre: !this.options.sanitizer
          && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
        text: cap[0]
      };
      if (this.options.sanitize) {
        const text = this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0]);
        token.type = 'paragraph';
        token.text = text;
        token.tokens = this.lexer.inline(text);
      }
      return token;
    }
  }

  def(src) {
    const cap = this.rules.block.def.exec(src);
    if (cap) {
      const tag = cap[1].toLowerCase().replace(/\s+/g, ' ');
      const href = cap[2] ? cap[2].replace(/^<(.*)>$/, '$1').replace(this.rules.inline._escapes, '$1') : '';
      const title = cap[3] ? cap[3].substring(1, cap[3].length - 1).replace(this.rules.inline._escapes, '$1') : cap[3];
      return {
        type: 'def',
        tag,
        raw: cap[0],
        href,
        title
      };
    }
  }

  table(src) {
    const cap = this.rules.block.table.exec(src);
    if (cap) {
      const item = {
        type: 'table',
        header: splitCells(cap[1]).map(c => { return { text: c }; }),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        rows: cap[3] && cap[3].trim() ? cap[3].replace(/\n[ \t]*$/, '').split('\n') : []
      };

      if (item.header.length === item.align.length) {
        item.raw = cap[0];

        let l = item.align.length;
        let i, j, k, row;
        for (i = 0; i < l; i++) {
          if (/^ *-+: *$/.test(item.align[i])) {
            item.align[i] = 'right';
          } else if (/^ *:-+: *$/.test(item.align[i])) {
            item.align[i] = 'center';
          } else if (/^ *:-+ *$/.test(item.align[i])) {
            item.align[i] = 'left';
          } else {
            item.align[i] = null;
          }
        }

        l = item.rows.length;
        for (i = 0; i < l; i++) {
          item.rows[i] = splitCells(item.rows[i], item.header.length).map(c => { return { text: c }; });
        }

        // parse child tokens inside headers and cells

        // header child tokens
        l = item.header.length;
        for (j = 0; j < l; j++) {
          item.header[j].tokens = this.lexer.inline(item.header[j].text);
        }

        // cell child tokens
        l = item.rows.length;
        for (j = 0; j < l; j++) {
          row = item.rows[j];
          for (k = 0; k < row.length; k++) {
            row[k].tokens = this.lexer.inline(row[k].text);
          }
        }

        return item;
      }
    }
  }

  lheading(src) {
    const cap = this.rules.block.lheading.exec(src);
    if (cap) {
      return {
        type: 'heading',
        raw: cap[0],
        depth: cap[2].charAt(0) === '=' ? 1 : 2,
        text: cap[1],
        tokens: this.lexer.inline(cap[1])
      };
    }
  }

  paragraph(src) {
    const cap = this.rules.block.paragraph.exec(src);
    if (cap) {
      const text = cap[1].charAt(cap[1].length - 1) === '\n'
        ? cap[1].slice(0, -1)
        : cap[1];
      return {
        type: 'paragraph',
        raw: cap[0],
        text,
        tokens: this.lexer.inline(text)
      };
    }
  }

  text(src) {
    const cap = this.rules.block.text.exec(src);
    if (cap) {
      return {
        type: 'text',
        raw: cap[0],
        text: cap[0],
        tokens: this.lexer.inline(cap[0])
      };
    }
  }

  escape(src) {
    const cap = this.rules.inline.escape.exec(src);
    if (cap) {
      return {
        type: 'escape',
        raw: cap[0],
        text: escape(cap[1])
      };
    }
  }

  tag(src) {
    const cap = this.rules.inline.tag.exec(src);
    if (cap) {
      if (!this.lexer.state.inLink && /^<a /i.test(cap[0])) {
        this.lexer.state.inLink = true;
      } else if (this.lexer.state.inLink && /^<\/a>/i.test(cap[0])) {
        this.lexer.state.inLink = false;
      }
      if (!this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
        this.lexer.state.inRawBlock = true;
      } else if (this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
        this.lexer.state.inRawBlock = false;
      }

      return {
        type: this.options.sanitize
          ? 'text'
          : 'html',
        raw: cap[0],
        inLink: this.lexer.state.inLink,
        inRawBlock: this.lexer.state.inRawBlock,
        text: this.options.sanitize
          ? (this.options.sanitizer
            ? this.options.sanitizer(cap[0])
            : escape(cap[0]))
          : cap[0]
      };
    }
  }

  link(src) {
    const cap = this.rules.inline.link.exec(src);
    if (cap) {
      const trimmedUrl = cap[2].trim();
      if (!this.options.pedantic && /^</.test(trimmedUrl)) {
        // commonmark requires matching angle brackets
        if (!(/>$/.test(trimmedUrl))) {
          return;
        }

        // ending angle bracket cannot be escaped
        const rtrimSlash = rtrim(trimmedUrl.slice(0, -1), '\\');
        if ((trimmedUrl.length - rtrimSlash.length) % 2 === 0) {
          return;
        }
      } else {
        // find closing parenthesis
        const lastParenIndex = findClosingBracket(cap[2], '()');
        if (lastParenIndex > -1) {
          const start = cap[0].indexOf('!') === 0 ? 5 : 4;
          const linkLen = start + cap[1].length + lastParenIndex;
          cap[2] = cap[2].substring(0, lastParenIndex);
          cap[0] = cap[0].substring(0, linkLen).trim();
          cap[3] = '';
        }
      }
      let href = cap[2];
      let title = '';
      if (this.options.pedantic) {
        // split pedantic href and title
        const link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);

        if (link) {
          href = link[1];
          title = link[3];
        }
      } else {
        title = cap[3] ? cap[3].slice(1, -1) : '';
      }

      href = href.trim();
      if (/^</.test(href)) {
        if (this.options.pedantic && !(/>$/.test(trimmedUrl))) {
          // pedantic allows starting angle bracket without ending angle bracket
          href = href.slice(1);
        } else {
          href = href.slice(1, -1);
        }
      }
      return outputLink(cap, {
        href: href ? href.replace(this.rules.inline._escapes, '$1') : href,
        title: title ? title.replace(this.rules.inline._escapes, '$1') : title
      }, cap[0], this.lexer);
    }
  }

  reflink(src, links) {
    let cap;
    if ((cap = this.rules.inline.reflink.exec(src))
        || (cap = this.rules.inline.nolink.exec(src))) {
      let link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
      link = links[link.toLowerCase()];
      if (!link) {
        const text = cap[0].charAt(0);
        return {
          type: 'text',
          raw: text,
          text
        };
      }
      return outputLink(cap, link, cap[0], this.lexer);
    }
  }

  emStrong(src, maskedSrc, prevChar = '') {
    let match = this.rules.inline.emStrong.lDelim.exec(src);
    if (!match) return;

    // _ can't be between two alphanumerics. \p{L}\p{N} includes non-english alphabet/numbers as well
    if (match[3] && prevChar.match(/[\p{L}\p{N}]/u)) return;

    const nextChar = match[1] || match[2] || '';

    if (!nextChar || (nextChar && (prevChar === '' || this.rules.inline.punctuation.exec(prevChar)))) {
      const lLength = match[0].length - 1;
      let rDelim, rLength, delimTotal = lLength, midDelimTotal = 0;

      const endReg = match[0][0] === '*' ? this.rules.inline.emStrong.rDelimAst : this.rules.inline.emStrong.rDelimUnd;
      endReg.lastIndex = 0;

      // Clip maskedSrc to same section of string as src (move to lexer?)
      maskedSrc = maskedSrc.slice(-1 * src.length + lLength);

      while ((match = endReg.exec(maskedSrc)) != null) {
        rDelim = match[1] || match[2] || match[3] || match[4] || match[5] || match[6];

        if (!rDelim) continue; // skip single * in __abc*abc__

        rLength = rDelim.length;

        if (match[3] || match[4]) { // found another Left Delim
          delimTotal += rLength;
          continue;
        } else if (match[5] || match[6]) { // either Left or Right Delim
          if (lLength % 3 && !((lLength + rLength) % 3)) {
            midDelimTotal += rLength;
            continue; // CommonMark Emphasis Rules 9-10
          }
        }

        delimTotal -= rLength;

        if (delimTotal > 0) continue; // Haven't found enough closing delimiters

        // Remove extra characters. *a*** -> *a*
        rLength = Math.min(rLength, rLength + delimTotal + midDelimTotal);

        const raw = src.slice(0, lLength + match.index + (match[0].length - rDelim.length) + rLength);

        // Create `em` if smallest delimiter has odd char count. *a***
        if (Math.min(lLength, rLength) % 2) {
          const text = raw.slice(1, -1);
          return {
            type: 'em',
            raw,
            text,
            tokens: this.lexer.inlineTokens(text)
          };
        }

        // Create 'strong' if smallest delimiter has even char count. **a***
        const text = raw.slice(2, -2);
        return {
          type: 'strong',
          raw,
          text,
          tokens: this.lexer.inlineTokens(text)
        };
      }
    }
  }

  codespan(src) {
    const cap = this.rules.inline.code.exec(src);
    if (cap) {
      let text = cap[2].replace(/\n/g, ' ');
      const hasNonSpaceChars = /[^ ]/.test(text);
      const hasSpaceCharsOnBothEnds = /^ /.test(text) && / $/.test(text);
      if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
        text = text.substring(1, text.length - 1);
      }
      text = escape(text, true);
      return {
        type: 'codespan',
        raw: cap[0],
        text
      };
    }
  }

  br(src) {
    const cap = this.rules.inline.br.exec(src);
    if (cap) {
      return {
        type: 'br',
        raw: cap[0]
      };
    }
  }

  del(src) {
    const cap = this.rules.inline.del.exec(src);
    if (cap) {
      return {
        type: 'del',
        raw: cap[0],
        text: cap[2],
        tokens: this.lexer.inlineTokens(cap[2])
      };
    }
  }

  autolink(src, mangle) {
    const cap = this.rules.inline.autolink.exec(src);
    if (cap) {
      let text, href;
      if (cap[2] === '@') {
        text = escape(this.options.mangle ? mangle(cap[1]) : cap[1]);
        href = 'mailto:' + text;
      } else {
        text = escape(cap[1]);
        href = text;
      }

      return {
        type: 'link',
        raw: cap[0],
        text,
        href,
        tokens: [
          {
            type: 'text',
            raw: text,
            text
          }
        ]
      };
    }
  }

  url(src, mangle) {
    let cap;
    if (cap = this.rules.inline.url.exec(src)) {
      let text, href;
      if (cap[2] === '@') {
        text = escape(this.options.mangle ? mangle(cap[0]) : cap[0]);
        href = 'mailto:' + text;
      } else {
        // do extended autolink path validation
        let prevCapZero;
        do {
          prevCapZero = cap[0];
          cap[0] = this.rules.inline._backpedal.exec(cap[0])[0];
        } while (prevCapZero !== cap[0]);
        text = escape(cap[0]);
        if (cap[1] === 'www.') {
          href = 'http://' + cap[0];
        } else {
          href = cap[0];
        }
      }
      return {
        type: 'link',
        raw: cap[0],
        text,
        href,
        tokens: [
          {
            type: 'text',
            raw: text,
            text
          }
        ]
      };
    }
  }

  inlineText(src, smartypants) {
    const cap = this.rules.inline.text.exec(src);
    if (cap) {
      let text;
      if (this.lexer.state.inRawBlock) {
        text = this.options.sanitize ? (this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0])) : cap[0];
      } else {
        text = escape(this.options.smartypants ? smartypants(cap[0]) : cap[0]);
      }
      return {
        type: 'text',
        raw: cap[0],
        text
      };
    }
  }
}

/**
 * Block-Level Grammar
 */
const block = {
  newline: /^(?: *(?:\n|$))+/,
  code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
  fences: /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
  hr: /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
  heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
  blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
  list: /^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,
  html: '^ {0,3}(?:' // optional indentation
    + '<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)' // (1)
    + '|comment[^\\n]*(\\n+|$)' // (2)
    + '|<\\?[\\s\\S]*?(?:\\?>\\n*|$)' // (3)
    + '|<![A-Z][\\s\\S]*?(?:>\\n*|$)' // (4)
    + '|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)' // (5)
    + '|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)' // (6)
    + '|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)' // (7) open tag
    + '|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)' // (7) closing tag
    + ')',
  def: /^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,
  table: noopTest,
  lheading: /^((?:.|\n(?!\n))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  // regex template, placeholders will be replaced according to different paragraph
  // interruption rules of commonmark and the original markdown spec:
  _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
  text: /^[^\n]+/
};

block._label = /(?!\s*\])(?:\\.|[^\[\]\\])+/;
block._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
block.def = edit(block.def)
  .replace('label', block._label)
  .replace('title', block._title)
  .getRegex();

block.bullet = /(?:[*+-]|\d{1,9}[.)])/;
block.listItemStart = edit(/^( *)(bull) */)
  .replace('bull', block.bullet)
  .getRegex();

block.list = edit(block.list)
  .replace(/bull/g, block.bullet)
  .replace('hr', '\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))')
  .replace('def', '\\n+(?=' + block.def.source + ')')
  .getRegex();

block._tag = 'address|article|aside|base|basefont|blockquote|body|caption'
  + '|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption'
  + '|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe'
  + '|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option'
  + '|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr'
  + '|track|ul';
block._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/;
block.html = edit(block.html, 'i')
  .replace('comment', block._comment)
  .replace('tag', block._tag)
  .replace('attribute', / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/)
  .getRegex();

block.paragraph = edit(block._paragraph)
  .replace('hr', block.hr)
  .replace('heading', ' {0,3}#{1,6} ')
  .replace('|lheading', '') // setex headings don't interrupt commonmark paragraphs
  .replace('|table', '')
  .replace('blockquote', ' {0,3}>')
  .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
  .replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
  .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)')
  .replace('tag', block._tag) // pars can be interrupted by type (6) html blocks
  .getRegex();

block.blockquote = edit(block.blockquote)
  .replace('paragraph', block.paragraph)
  .getRegex();

/**
 * Normal Block Grammar
 */

block.normal = { ...block };

/**
 * GFM Block Grammar
 */

block.gfm = {
  ...block.normal,
  table: '^ *([^\\n ].*\\|.*)\\n' // Header
    + ' {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?' // Align
    + '(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)' // Cells
};

block.gfm.table = edit(block.gfm.table)
  .replace('hr', block.hr)
  .replace('heading', ' {0,3}#{1,6} ')
  .replace('blockquote', ' {0,3}>')
  .replace('code', ' {4}[^\\n]')
  .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
  .replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
  .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)')
  .replace('tag', block._tag) // tables can be interrupted by type (6) html blocks
  .getRegex();

block.gfm.paragraph = edit(block._paragraph)
  .replace('hr', block.hr)
  .replace('heading', ' {0,3}#{1,6} ')
  .replace('|lheading', '') // setex headings don't interrupt commonmark paragraphs
  .replace('table', block.gfm.table) // interrupt paragraphs with table
  .replace('blockquote', ' {0,3}>')
  .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
  .replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
  .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)')
  .replace('tag', block._tag) // pars can be interrupted by type (6) html blocks
  .getRegex();
/**
 * Pedantic grammar (original John Gruber's loose markdown specification)
 */

block.pedantic = {
  ...block.normal,
  html: edit(
    '^ *(?:comment *(?:\\n|\\s*$)'
    + '|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)' // closed tag
    + '|<tag(?:"[^"]*"|\'[^\']*\'|\\s[^\'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))')
    .replace('comment', block._comment)
    .replace(/tag/g, '(?!(?:'
      + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub'
      + '|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)'
      + '\\b)\\w+(?!:|[^\\w\\s@]*@)\\b')
    .getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: noopTest, // fences not supported
  lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  paragraph: edit(block.normal._paragraph)
    .replace('hr', block.hr)
    .replace('heading', ' *#{1,6} *[^\n]')
    .replace('lheading', block.lheading)
    .replace('blockquote', ' {0,3}>')
    .replace('|fences', '')
    .replace('|list', '')
    .replace('|html', '')
    .getRegex()
};

/**
 * Inline-Level Grammar
 */
const inline = {
  escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
  autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
  url: noopTest,
  tag: '^comment'
    + '|^</[a-zA-Z][\\w:-]*\\s*>' // self-closing tag
    + '|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>' // open tag
    + '|^<\\?[\\s\\S]*?\\?>' // processing instruction, e.g. <?php ?>
    + '|^<![a-zA-Z]+\\s[\\s\\S]*?>' // declaration, e.g. <!DOCTYPE html>
    + '|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>', // CDATA section
  link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
  reflink: /^!?\[(label)\]\[(ref)\]/,
  nolink: /^!?\[(ref)\](?:\[\])?/,
  reflinkSearch: 'reflink|nolink(?!\\()',
  emStrong: {
    lDelim: /^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,
    //        (1) and (2) can only be a Right Delimiter. (3) and (4) can only be Left.  (5) and (6) can be either Left or Right.
    //          () Skip orphan inside strong                                      () Consume to delim     (1) #***                (2) a***#, a***                             (3) #***a, ***a                 (4) ***#              (5) #***#                 (6) a***a
    rDelimAst: /^(?:[^_*\\]|\\.)*?\_\_(?:[^_*\\]|\\.)*?\*(?:[^_*\\]|\\.)*?(?=\_\_)|(?:[^*\\]|\\.)+(?=[^*])|[punct_](\*+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|(?:[^punct*_\s\\]|\\.)(\*+)(?=[^punct*_\s])/,
    rDelimUnd: /^(?:[^_*\\]|\\.)*?\*\*(?:[^_*\\]|\\.)*?\_(?:[^_*\\]|\\.)*?(?=\*\*)|(?:[^_\\]|\\.)+(?=[^_])|[punct*](\_+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/ // ^- Not allowed for _
  },
  code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
  br: /^( {2,}|\\)\n(?!\s*$)/,
  del: noopTest,
  text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
  punctuation: /^([\spunctuation])/
};

// list of punctuation marks from CommonMark spec
// without * and _ to handle the different emphasis markers * and _
inline._punctuation = '!"#$%&\'()+\\-.,/:;<=>?@\\[\\]`^{|}~';
inline.punctuation = edit(inline.punctuation).replace(/punctuation/g, inline._punctuation).getRegex();

// sequences em should skip over [title](link), `code`, <html>
inline.blockSkip = /\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g;
// lookbehind is not available on Safari as of version 16
// inline.escapedEmSt = /(?<=(?:^|[^\\)(?:\\[^])*)\\[*_]/g;
inline.escapedEmSt = /(?:^|[^\\])(?:\\\\)*\\[*_]/g;

inline._comment = edit(block._comment).replace('(?:-->|$)', '-->').getRegex();

inline.emStrong.lDelim = edit(inline.emStrong.lDelim)
  .replace(/punct/g, inline._punctuation)
  .getRegex();

inline.emStrong.rDelimAst = edit(inline.emStrong.rDelimAst, 'g')
  .replace(/punct/g, inline._punctuation)
  .getRegex();

inline.emStrong.rDelimUnd = edit(inline.emStrong.rDelimUnd, 'g')
  .replace(/punct/g, inline._punctuation)
  .getRegex();

inline._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;

inline._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
inline._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
inline.autolink = edit(inline.autolink)
  .replace('scheme', inline._scheme)
  .replace('email', inline._email)
  .getRegex();

inline._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;

inline.tag = edit(inline.tag)
  .replace('comment', inline._comment)
  .replace('attribute', inline._attribute)
  .getRegex();

inline._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
inline._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/;
inline._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;

inline.link = edit(inline.link)
  .replace('label', inline._label)
  .replace('href', inline._href)
  .replace('title', inline._title)
  .getRegex();

inline.reflink = edit(inline.reflink)
  .replace('label', inline._label)
  .replace('ref', block._label)
  .getRegex();

inline.nolink = edit(inline.nolink)
  .replace('ref', block._label)
  .getRegex();

inline.reflinkSearch = edit(inline.reflinkSearch, 'g')
  .replace('reflink', inline.reflink)
  .replace('nolink', inline.nolink)
  .getRegex();

/**
 * Normal Inline Grammar
 */

inline.normal = { ...inline };

/**
 * Pedantic Inline Grammar
 */

inline.pedantic = {
  ...inline.normal,
  strong: {
    start: /^__|\*\*/,
    middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
    endAst: /\*\*(?!\*)/g,
    endUnd: /__(?!_)/g
  },
  em: {
    start: /^_|\*/,
    middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
    endAst: /\*(?!\*)/g,
    endUnd: /_(?!_)/g
  },
  link: edit(/^!?\[(label)\]\((.*?)\)/)
    .replace('label', inline._label)
    .getRegex(),
  reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/)
    .replace('label', inline._label)
    .getRegex()
};

/**
 * GFM Inline Grammar
 */

inline.gfm = {
  ...inline.normal,
  escape: edit(inline.escape).replace('])', '~|])').getRegex(),
  _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
  url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
  _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
};

inline.gfm.url = edit(inline.gfm.url, 'i')
  .replace('email', inline.gfm._extended_email)
  .getRegex();
/**
 * GFM + Line Breaks Inline Grammar
 */

inline.breaks = {
  ...inline.gfm,
  br: edit(inline.br).replace('{2,}', '*').getRegex(),
  text: edit(inline.gfm.text)
    .replace('\\b_', '\\b_| {2,}\\n')
    .replace(/\{2,\}/g, '*')
    .getRegex()
};

/**
 * smartypants text replacement
 * @param {string} text
 */
function smartypants(text) {
  return text
    // em-dashes
    .replace(/---/g, '\u2014')
    // en-dashes
    .replace(/--/g, '\u2013')
    // opening singles
    .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
    // closing singles & apostrophes
    .replace(/'/g, '\u2019')
    // opening doubles
    .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')
    // closing doubles
    .replace(/"/g, '\u201d')
    // ellipses
    .replace(/\.{3}/g, '\u2026');
}

/**
 * mangle email addresses
 * @param {string} text
 */
function mangle(text) {
  let out = '',
    i,
    ch;

  const l = text.length;
  for (i = 0; i < l; i++) {
    ch = text.charCodeAt(i);
    if (Math.random() > 0.5) {
      ch = 'x' + ch.toString(16);
    }
    out += '&#' + ch + ';';
  }

  return out;
}

/**
 * Block Lexer
 */
class Lexer {
  constructor(options) {
    this.tokens = [];
    this.tokens.links = Object.create(null);
    this.options = options || defaults;
    this.options.tokenizer = this.options.tokenizer || new Tokenizer();
    this.tokenizer = this.options.tokenizer;
    this.tokenizer.options = this.options;
    this.tokenizer.lexer = this;
    this.inlineQueue = [];
    this.state = {
      inLink: false,
      inRawBlock: false,
      top: true
    };

    const rules = {
      block: block.normal,
      inline: inline.normal
    };

    if (this.options.pedantic) {
      rules.block = block.pedantic;
      rules.inline = inline.pedantic;
    } else if (this.options.gfm) {
      rules.block = block.gfm;
      if (this.options.breaks) {
        rules.inline = inline.breaks;
      } else {
        rules.inline = inline.gfm;
      }
    }
    this.tokenizer.rules = rules;
  }

  /**
   * Expose Rules
   */
  static get rules() {
    return {
      block,
      inline
    };
  }

  /**
   * Static Lex Method
   */
  static lex(src, options) {
    const lexer = new Lexer(options);
    return lexer.lex(src);
  }

  /**
   * Static Lex Inline Method
   */
  static lexInline(src, options) {
    const lexer = new Lexer(options);
    return lexer.inlineTokens(src);
  }

  /**
   * Preprocessing
   */
  lex(src) {
    src = src
      .replace(/\r\n|\r/g, '\n');

    this.blockTokens(src, this.tokens);

    let next;
    while (next = this.inlineQueue.shift()) {
      this.inlineTokens(next.src, next.tokens);
    }

    return this.tokens;
  }

  /**
   * Lexing
   */
  blockTokens(src, tokens = []) {
    if (this.options.pedantic) {
      src = src.replace(/\t/g, '    ').replace(/^ +$/gm, '');
    } else {
      src = src.replace(/^( *)(\t+)/gm, (_, leading, tabs) => {
        return leading + '    '.repeat(tabs.length);
      });
    }

    let token, lastToken, cutSrc, lastParagraphClipped;

    while (src) {
      if (this.options.extensions
        && this.options.extensions.block
        && this.options.extensions.block.some((extTokenizer) => {
          if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            return true;
          }
          return false;
        })) {
        continue;
      }

      // newline
      if (token = this.tokenizer.space(src)) {
        src = src.substring(token.raw.length);
        if (token.raw.length === 1 && tokens.length > 0) {
          // if there's a single \n as a spacer, it's terminating the last line,
          // so move it there so that we don't get unecessary paragraph tags
          tokens[tokens.length - 1].raw += '\n';
        } else {
          tokens.push(token);
        }
        continue;
      }

      // code
      if (token = this.tokenizer.code(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        // An indented code block cannot interrupt a paragraph.
        if (lastToken && (lastToken.type === 'paragraph' || lastToken.type === 'text')) {
          lastToken.raw += '\n' + token.raw;
          lastToken.text += '\n' + token.text;
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token);
        }
        continue;
      }

      // fences
      if (token = this.tokenizer.fences(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }

      // heading
      if (token = this.tokenizer.heading(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }

      // hr
      if (token = this.tokenizer.hr(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }

      // blockquote
      if (token = this.tokenizer.blockquote(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }

      // list
      if (token = this.tokenizer.list(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }

      // html
      if (token = this.tokenizer.html(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }

      // def
      if (token = this.tokenizer.def(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && (lastToken.type === 'paragraph' || lastToken.type === 'text')) {
          lastToken.raw += '\n' + token.raw;
          lastToken.text += '\n' + token.raw;
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else if (!this.tokens.links[token.tag]) {
          this.tokens.links[token.tag] = {
            href: token.href,
            title: token.title
          };
        }
        continue;
      }

      // table (gfm)
      if (token = this.tokenizer.table(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }

      // lheading
      if (token = this.tokenizer.lheading(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }

      // top-level paragraph
      // prevent paragraph consuming extensions by clipping 'src' to extension start
      cutSrc = src;
      if (this.options.extensions && this.options.extensions.startBlock) {
        let startIndex = Infinity;
        const tempSrc = src.slice(1);
        let tempStart;
        this.options.extensions.startBlock.forEach(function(getStartIndex) {
          tempStart = getStartIndex.call({ lexer: this }, tempSrc);
          if (typeof tempStart === 'number' && tempStart >= 0) { startIndex = Math.min(startIndex, tempStart); }
        });
        if (startIndex < Infinity && startIndex >= 0) {
          cutSrc = src.substring(0, startIndex + 1);
        }
      }
      if (this.state.top && (token = this.tokenizer.paragraph(cutSrc))) {
        lastToken = tokens[tokens.length - 1];
        if (lastParagraphClipped && lastToken.type === 'paragraph') {
          lastToken.raw += '\n' + token.raw;
          lastToken.text += '\n' + token.text;
          this.inlineQueue.pop();
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token);
        }
        lastParagraphClipped = (cutSrc.length !== src.length);
        src = src.substring(token.raw.length);
        continue;
      }

      // text
      if (token = this.tokenizer.text(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && lastToken.type === 'text') {
          lastToken.raw += '\n' + token.raw;
          lastToken.text += '\n' + token.text;
          this.inlineQueue.pop();
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token);
        }
        continue;
      }

      if (src) {
        const errMsg = 'Infinite loop on byte: ' + src.charCodeAt(0);
        if (this.options.silent) {
          console.error(errMsg);
          break;
        } else {
          throw new Error(errMsg);
        }
      }
    }

    this.state.top = true;
    return tokens;
  }

  inline(src, tokens = []) {
    this.inlineQueue.push({ src, tokens });
    return tokens;
  }

  /**
   * Lexing/Compiling
   */
  inlineTokens(src, tokens = []) {
    let token, lastToken, cutSrc;

    // String with links masked to avoid interference with em and strong
    let maskedSrc = src;
    let match;
    let keepPrevChar, prevChar;

    // Mask out reflinks
    if (this.tokens.links) {
      const links = Object.keys(this.tokens.links);
      if (links.length > 0) {
        while ((match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null) {
          if (links.includes(match[0].slice(match[0].lastIndexOf('[') + 1, -1))) {
            maskedSrc = maskedSrc.slice(0, match.index) + '[' + repeatString('a', match[0].length - 2) + ']' + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
          }
        }
      }
    }
    // Mask out other blocks
    while ((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null) {
      maskedSrc = maskedSrc.slice(0, match.index) + '[' + repeatString('a', match[0].length - 2) + ']' + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    }

    // Mask out escaped em & strong delimiters
    while ((match = this.tokenizer.rules.inline.escapedEmSt.exec(maskedSrc)) != null) {
      maskedSrc = maskedSrc.slice(0, match.index + match[0].length - 2) + '++' + maskedSrc.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex);
      this.tokenizer.rules.inline.escapedEmSt.lastIndex--;
    }

    while (src) {
      if (!keepPrevChar) {
        prevChar = '';
      }
      keepPrevChar = false;

      // extensions
      if (this.options.extensions
        && this.options.extensions.inline
        && this.options.extensions.inline.some((extTokenizer) => {
          if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            return true;
          }
          return false;
        })) {
        continue;
      }

      // escape
      if (token = this.tokenizer.escape(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }

      // tag
      if (token = this.tokenizer.tag(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && token.type === 'text' && lastToken.type === 'text') {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }

      // link
      if (token = this.tokenizer.link(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }

      // reflink, nolink
      if (token = this.tokenizer.reflink(src, this.tokens.links)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && token.type === 'text' && lastToken.type === 'text') {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }

      // em & strong
      if (token = this.tokenizer.emStrong(src, maskedSrc, prevChar)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }

      // code
      if (token = this.tokenizer.codespan(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }

      // br
      if (token = this.tokenizer.br(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }

      // del (gfm)
      if (token = this.tokenizer.del(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }

      // autolink
      if (token = this.tokenizer.autolink(src, mangle)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }

      // url (gfm)
      if (!this.state.inLink && (token = this.tokenizer.url(src, mangle))) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }

      // text
      // prevent inlineText consuming extensions by clipping 'src' to extension start
      cutSrc = src;
      if (this.options.extensions && this.options.extensions.startInline) {
        let startIndex = Infinity;
        const tempSrc = src.slice(1);
        let tempStart;
        this.options.extensions.startInline.forEach(function(getStartIndex) {
          tempStart = getStartIndex.call({ lexer: this }, tempSrc);
          if (typeof tempStart === 'number' && tempStart >= 0) { startIndex = Math.min(startIndex, tempStart); }
        });
        if (startIndex < Infinity && startIndex >= 0) {
          cutSrc = src.substring(0, startIndex + 1);
        }
      }
      if (token = this.tokenizer.inlineText(cutSrc, smartypants)) {
        src = src.substring(token.raw.length);
        if (token.raw.slice(-1) !== '_') { // Track prevChar before string of ____ started
          prevChar = token.raw.slice(-1);
        }
        keepPrevChar = true;
        lastToken = tokens[tokens.length - 1];
        if (lastToken && lastToken.type === 'text') {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }

      if (src) {
        const errMsg = 'Infinite loop on byte: ' + src.charCodeAt(0);
        if (this.options.silent) {
          console.error(errMsg);
          break;
        } else {
          throw new Error(errMsg);
        }
      }
    }

    return tokens;
  }
}

/**
 * Renderer
 */
class Renderer {
  constructor(options) {
    this.options = options || defaults;
  }

  code(code, infostring, escaped) {
    const lang = (infostring || '').match(/\S*/)[0];
    if (this.options.highlight) {
      const out = this.options.highlight(code, lang);
      if (out != null && out !== code) {
        escaped = true;
        code = out;
      }
    }

    code = code.replace(/\n$/, '') + '\n';

    if (!lang) {
      return '<pre><code>'
        + (escaped ? code : escape(code, true))
        + '</code></pre>\n';
    }

    return '<pre><code class="'
      + this.options.langPrefix
      + escape(lang)
      + '">'
      + (escaped ? code : escape(code, true))
      + '</code></pre>\n';
  }

  /**
   * @param {string} quote
   */
  blockquote(quote) {
    return `<blockquote>\n${quote}</blockquote>\n`;
  }

  html(html) {
    return html;
  }

  /**
   * @param {string} text
   * @param {string} level
   * @param {string} raw
   * @param {any} slugger
   */
  heading(text, level, raw, slugger) {
    if (this.options.headerIds) {
      const id = this.options.headerPrefix + slugger.slug(raw);
      return `<h${level} id="${id}">${text}</h${level}>\n`;
    }

    // ignore IDs
    return `<h${level}>${text}</h${level}>\n`;
  }

  hr() {
    return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
  }

  list(body, ordered, start) {
    const type = ordered ? 'ol' : 'ul',
      startatt = (ordered && start !== 1) ? (' start="' + start + '"') : '';
    return '<' + type + startatt + '>\n' + body + '</' + type + '>\n';
  }

  /**
   * @param {string} text
   */
  listitem(text) {
    return `<li>${text}</li>\n`;
  }

  checkbox(checked) {
    return '<input '
      + (checked ? 'checked="" ' : '')
      + 'disabled="" type="checkbox"'
      + (this.options.xhtml ? ' /' : '')
      + '> ';
  }

  /**
   * @param {string} text
   */
  paragraph(text) {
    return `<p>${text}</p>\n`;
  }

  /**
   * @param {string} header
   * @param {string} body
   */
  table(header, body) {
    if (body) body = `<tbody>${body}</tbody>`;

    return '<table>\n'
      + '<thead>\n'
      + header
      + '</thead>\n'
      + body
      + '</table>\n';
  }

  /**
   * @param {string} content
   */
  tablerow(content) {
    return `<tr>\n${content}</tr>\n`;
  }

  tablecell(content, flags) {
    const type = flags.header ? 'th' : 'td';
    const tag = flags.align
      ? `<${type} align="${flags.align}">`
      : `<${type}>`;
    return tag + content + `</${type}>\n`;
  }

  /**
   * span level renderer
   * @param {string} text
   */
  strong(text) {
    return `<strong>${text}</strong>`;
  }

  /**
   * @param {string} text
   */
  em(text) {
    return `<em>${text}</em>`;
  }

  /**
   * @param {string} text
   */
  codespan(text) {
    return `<code>${text}</code>`;
  }

  br() {
    return this.options.xhtml ? '<br/>' : '<br>';
  }

  /**
   * @param {string} text
   */
  del(text) {
    return `<del>${text}</del>`;
  }

  /**
   * @param {string} href
   * @param {string} title
   * @param {string} text
   */
  link(href, title, text) {
    href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
    if (href === null) {
      return text;
    }
    let out = '<a href="' + href + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += '>' + text + '</a>';
    return out;
  }

  /**
   * @param {string} href
   * @param {string} title
   * @param {string} text
   */
  image(href, title, text) {
    href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
    if (href === null) {
      return text;
    }

    let out = `<img src="${href}" alt="${text}"`;
    if (title) {
      out += ` title="${title}"`;
    }
    out += this.options.xhtml ? '/>' : '>';
    return out;
  }

  text(text) {
    return text;
  }
}

/**
 * TextRenderer
 * returns only the textual part of the token
 */
class TextRenderer {
  // no need for block level renderers
  strong(text) {
    return text;
  }

  em(text) {
    return text;
  }

  codespan(text) {
    return text;
  }

  del(text) {
    return text;
  }

  html(text) {
    return text;
  }

  text(text) {
    return text;
  }

  link(href, title, text) {
    return '' + text;
  }

  image(href, title, text) {
    return '' + text;
  }

  br() {
    return '';
  }
}

/**
 * Slugger generates header id
 */
class Slugger {
  constructor() {
    this.seen = {};
  }

  /**
   * @param {string} value
   */
  serialize(value) {
    return value
      .toLowerCase()
      .trim()
      // remove html tags
      .replace(/<[!\/a-z].*?>/ig, '')
      // remove unwanted chars
      .replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, '')
      .replace(/\s/g, '-');
  }

  /**
   * Finds the next safe (unique) slug to use
   * @param {string} originalSlug
   * @param {boolean} isDryRun
   */
  getNextSafeSlug(originalSlug, isDryRun) {
    let slug = originalSlug;
    let occurenceAccumulator = 0;
    if (this.seen.hasOwnProperty(slug)) {
      occurenceAccumulator = this.seen[originalSlug];
      do {
        occurenceAccumulator++;
        slug = originalSlug + '-' + occurenceAccumulator;
      } while (this.seen.hasOwnProperty(slug));
    }
    if (!isDryRun) {
      this.seen[originalSlug] = occurenceAccumulator;
      this.seen[slug] = 0;
    }
    return slug;
  }

  /**
   * Convert string to unique id
   * @param {object} [options]
   * @param {boolean} [options.dryrun] Generates the next unique slug without
   * updating the internal accumulator.
   */
  slug(value, options = {}) {
    const slug = this.serialize(value);
    return this.getNextSafeSlug(slug, options.dryrun);
  }
}

/**
 * Parsing & Compiling
 */
let Parser$1 = class Parser {
  constructor(options) {
    this.options = options || defaults;
    this.options.renderer = this.options.renderer || new Renderer();
    this.renderer = this.options.renderer;
    this.renderer.options = this.options;
    this.textRenderer = new TextRenderer();
    this.slugger = new Slugger();
  }

  /**
   * Static Parse Method
   */
  static parse(tokens, options) {
    const parser = new Parser(options);
    return parser.parse(tokens);
  }

  /**
   * Static Parse Inline Method
   */
  static parseInline(tokens, options) {
    const parser = new Parser(options);
    return parser.parseInline(tokens);
  }

  /**
   * Parse Loop
   */
  parse(tokens, top = true) {
    let out = '',
      i,
      j,
      k,
      l2,
      l3,
      row,
      cell,
      header,
      body,
      token,
      ordered,
      start,
      loose,
      itemBody,
      item,
      checked,
      task,
      checkbox,
      ret;

    const l = tokens.length;
    for (i = 0; i < l; i++) {
      token = tokens[i];

      // Run any renderer extensions
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
        ret = this.options.extensions.renderers[token.type].call({ parser: this }, token);
        if (ret !== false || !['space', 'hr', 'heading', 'code', 'table', 'blockquote', 'list', 'html', 'paragraph', 'text'].includes(token.type)) {
          out += ret || '';
          continue;
        }
      }

      switch (token.type) {
        case 'space': {
          continue;
        }
        case 'hr': {
          out += this.renderer.hr();
          continue;
        }
        case 'heading': {
          out += this.renderer.heading(
            this.parseInline(token.tokens),
            token.depth,
            unescape(this.parseInline(token.tokens, this.textRenderer)),
            this.slugger);
          continue;
        }
        case 'code': {
          out += this.renderer.code(token.text,
            token.lang,
            token.escaped);
          continue;
        }
        case 'table': {
          header = '';

          // header
          cell = '';
          l2 = token.header.length;
          for (j = 0; j < l2; j++) {
            cell += this.renderer.tablecell(
              this.parseInline(token.header[j].tokens),
              { header: true, align: token.align[j] }
            );
          }
          header += this.renderer.tablerow(cell);

          body = '';
          l2 = token.rows.length;
          for (j = 0; j < l2; j++) {
            row = token.rows[j];

            cell = '';
            l3 = row.length;
            for (k = 0; k < l3; k++) {
              cell += this.renderer.tablecell(
                this.parseInline(row[k].tokens),
                { header: false, align: token.align[k] }
              );
            }

            body += this.renderer.tablerow(cell);
          }
          out += this.renderer.table(header, body);
          continue;
        }
        case 'blockquote': {
          body = this.parse(token.tokens);
          out += this.renderer.blockquote(body);
          continue;
        }
        case 'list': {
          ordered = token.ordered;
          start = token.start;
          loose = token.loose;
          l2 = token.items.length;

          body = '';
          for (j = 0; j < l2; j++) {
            item = token.items[j];
            checked = item.checked;
            task = item.task;

            itemBody = '';
            if (item.task) {
              checkbox = this.renderer.checkbox(checked);
              if (loose) {
                if (item.tokens.length > 0 && item.tokens[0].type === 'paragraph') {
                  item.tokens[0].text = checkbox + ' ' + item.tokens[0].text;
                  if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === 'text') {
                    item.tokens[0].tokens[0].text = checkbox + ' ' + item.tokens[0].tokens[0].text;
                  }
                } else {
                  item.tokens.unshift({
                    type: 'text',
                    text: checkbox
                  });
                }
              } else {
                itemBody += checkbox;
              }
            }

            itemBody += this.parse(item.tokens, loose);
            body += this.renderer.listitem(itemBody, task, checked);
          }

          out += this.renderer.list(body, ordered, start);
          continue;
        }
        case 'html': {
          // TODO parse inline content if parameter markdown=1
          out += this.renderer.html(token.text);
          continue;
        }
        case 'paragraph': {
          out += this.renderer.paragraph(this.parseInline(token.tokens));
          continue;
        }
        case 'text': {
          body = token.tokens ? this.parseInline(token.tokens) : token.text;
          while (i + 1 < l && tokens[i + 1].type === 'text') {
            token = tokens[++i];
            body += '\n' + (token.tokens ? this.parseInline(token.tokens) : token.text);
          }
          out += top ? this.renderer.paragraph(body) : body;
          continue;
        }

        default: {
          const errMsg = 'Token with "' + token.type + '" type was not found.';
          if (this.options.silent) {
            console.error(errMsg);
            return;
          } else {
            throw new Error(errMsg);
          }
        }
      }
    }

    return out;
  }

  /**
   * Parse Inline Tokens
   */
  parseInline(tokens, renderer) {
    renderer = renderer || this.renderer;
    let out = '',
      i,
      token,
      ret;

    const l = tokens.length;
    for (i = 0; i < l; i++) {
      token = tokens[i];

      // Run any renderer extensions
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
        ret = this.options.extensions.renderers[token.type].call({ parser: this }, token);
        if (ret !== false || !['escape', 'html', 'link', 'image', 'strong', 'em', 'codespan', 'br', 'del', 'text'].includes(token.type)) {
          out += ret || '';
          continue;
        }
      }

      switch (token.type) {
        case 'escape': {
          out += renderer.text(token.text);
          break;
        }
        case 'html': {
          out += renderer.html(token.text);
          break;
        }
        case 'link': {
          out += renderer.link(token.href, token.title, this.parseInline(token.tokens, renderer));
          break;
        }
        case 'image': {
          out += renderer.image(token.href, token.title, token.text);
          break;
        }
        case 'strong': {
          out += renderer.strong(this.parseInline(token.tokens, renderer));
          break;
        }
        case 'em': {
          out += renderer.em(this.parseInline(token.tokens, renderer));
          break;
        }
        case 'codespan': {
          out += renderer.codespan(token.text);
          break;
        }
        case 'br': {
          out += renderer.br();
          break;
        }
        case 'del': {
          out += renderer.del(this.parseInline(token.tokens, renderer));
          break;
        }
        case 'text': {
          out += renderer.text(token.text);
          break;
        }
        default: {
          const errMsg = 'Token with "' + token.type + '" type was not found.';
          if (this.options.silent) {
            console.error(errMsg);
            return;
          } else {
            throw new Error(errMsg);
          }
        }
      }
    }
    return out;
  }
};

class Hooks {
  constructor(options) {
    this.options = options || defaults;
  }

  static passThroughHooks = new Set([
    'preprocess',
    'postprocess'
  ]);

  /**
   * Process markdown before marked
   */
  preprocess(markdown) {
    return markdown;
  }

  /**
   * Process HTML after marked is finished
   */
  postprocess(html) {
    return html;
  }
}

function onError(silent, async, callback) {
  return (e) => {
    e.message += '\nPlease report this to https://github.com/markedjs/marked.';

    if (silent) {
      const msg = '<p>An error occurred:</p><pre>'
        + escape(e.message + '', true)
        + '</pre>';
      if (async) {
        return Promise.resolve(msg);
      }
      if (callback) {
        callback(null, msg);
        return;
      }
      return msg;
    }

    if (async) {
      return Promise.reject(e);
    }
    if (callback) {
      callback(e);
      return;
    }
    throw e;
  };
}

function parseMarkdown(lexer, parser) {
  return (src, opt, callback) => {
    if (typeof opt === 'function') {
      callback = opt;
      opt = null;
    }

    const origOpt = { ...opt };
    opt = { ...marked.defaults, ...origOpt };
    const throwError = onError(opt.silent, opt.async, callback);

    // throw error in case of non string input
    if (typeof src === 'undefined' || src === null) {
      return throwError(new Error('marked(): input parameter is undefined or null'));
    }
    if (typeof src !== 'string') {
      return throwError(new Error('marked(): input parameter is of type '
        + Object.prototype.toString.call(src) + ', string expected'));
    }

    checkSanitizeDeprecation(opt);

    if (opt.hooks) {
      opt.hooks.options = opt;
    }

    if (callback) {
      const highlight = opt.highlight;
      let tokens;

      try {
        if (opt.hooks) {
          src = opt.hooks.preprocess(src);
        }
        tokens = lexer(src, opt);
      } catch (e) {
        return throwError(e);
      }

      const done = function(err) {
        let out;

        if (!err) {
          try {
            if (opt.walkTokens) {
              marked.walkTokens(tokens, opt.walkTokens);
            }
            out = parser(tokens, opt);
            if (opt.hooks) {
              out = opt.hooks.postprocess(out);
            }
          } catch (e) {
            err = e;
          }
        }

        opt.highlight = highlight;

        return err
          ? throwError(err)
          : callback(null, out);
      };

      if (!highlight || highlight.length < 3) {
        return done();
      }

      delete opt.highlight;

      if (!tokens.length) return done();

      let pending = 0;
      marked.walkTokens(tokens, function(token) {
        if (token.type === 'code') {
          pending++;
          setTimeout(() => {
            highlight(token.text, token.lang, function(err, code) {
              if (err) {
                return done(err);
              }
              if (code != null && code !== token.text) {
                token.text = code;
                token.escaped = true;
              }

              pending--;
              if (pending === 0) {
                done();
              }
            });
          }, 0);
        }
      });

      if (pending === 0) {
        done();
      }

      return;
    }

    if (opt.async) {
      return Promise.resolve(opt.hooks ? opt.hooks.preprocess(src) : src)
        .then(src => lexer(src, opt))
        .then(tokens => opt.walkTokens ? Promise.all(marked.walkTokens(tokens, opt.walkTokens)).then(() => tokens) : tokens)
        .then(tokens => parser(tokens, opt))
        .then(html => opt.hooks ? opt.hooks.postprocess(html) : html)
        .catch(throwError);
    }

    try {
      if (opt.hooks) {
        src = opt.hooks.preprocess(src);
      }
      const tokens = lexer(src, opt);
      if (opt.walkTokens) {
        marked.walkTokens(tokens, opt.walkTokens);
      }
      let html = parser(tokens, opt);
      if (opt.hooks) {
        html = opt.hooks.postprocess(html);
      }
      return html;
    } catch (e) {
      return throwError(e);
    }
  };
}

/**
 * Marked
 */
function marked(src, opt, callback) {
  return parseMarkdown(Lexer.lex, Parser$1.parse)(src, opt, callback);
}

/**
 * Options
 */

marked.options =
marked.setOptions = function(opt) {
  marked.defaults = { ...marked.defaults, ...opt };
  changeDefaults(marked.defaults);
  return marked;
};

marked.getDefaults = getDefaults;

marked.defaults = defaults;

/**
 * Use Extension
 */

marked.use = function(...args) {
  const extensions = marked.defaults.extensions || { renderers: {}, childTokens: {} };

  args.forEach((pack) => {
    // copy options to new object
    const opts = { ...pack };

    // set async to true if it was set to true before
    opts.async = marked.defaults.async || opts.async || false;

    // ==-- Parse "addon" extensions --== //
    if (pack.extensions) {
      pack.extensions.forEach((ext) => {
        if (!ext.name) {
          throw new Error('extension name required');
        }
        if (ext.renderer) { // Renderer extensions
          const prevRenderer = extensions.renderers[ext.name];
          if (prevRenderer) {
            // Replace extension with func to run new extension but fall back if false
            extensions.renderers[ext.name] = function(...args) {
              let ret = ext.renderer.apply(this, args);
              if (ret === false) {
                ret = prevRenderer.apply(this, args);
              }
              return ret;
            };
          } else {
            extensions.renderers[ext.name] = ext.renderer;
          }
        }
        if (ext.tokenizer) { // Tokenizer Extensions
          if (!ext.level || (ext.level !== 'block' && ext.level !== 'inline')) {
            throw new Error("extension level must be 'block' or 'inline'");
          }
          if (extensions[ext.level]) {
            extensions[ext.level].unshift(ext.tokenizer);
          } else {
            extensions[ext.level] = [ext.tokenizer];
          }
          if (ext.start) { // Function to check for start of token
            if (ext.level === 'block') {
              if (extensions.startBlock) {
                extensions.startBlock.push(ext.start);
              } else {
                extensions.startBlock = [ext.start];
              }
            } else if (ext.level === 'inline') {
              if (extensions.startInline) {
                extensions.startInline.push(ext.start);
              } else {
                extensions.startInline = [ext.start];
              }
            }
          }
        }
        if (ext.childTokens) { // Child tokens to be visited by walkTokens
          extensions.childTokens[ext.name] = ext.childTokens;
        }
      });
      opts.extensions = extensions;
    }

    // ==-- Parse "overwrite" extensions --== //
    if (pack.renderer) {
      const renderer = marked.defaults.renderer || new Renderer();
      for (const prop in pack.renderer) {
        const prevRenderer = renderer[prop];
        // Replace renderer with func to run extension, but fall back if false
        renderer[prop] = (...args) => {
          let ret = pack.renderer[prop].apply(renderer, args);
          if (ret === false) {
            ret = prevRenderer.apply(renderer, args);
          }
          return ret;
        };
      }
      opts.renderer = renderer;
    }
    if (pack.tokenizer) {
      const tokenizer = marked.defaults.tokenizer || new Tokenizer();
      for (const prop in pack.tokenizer) {
        const prevTokenizer = tokenizer[prop];
        // Replace tokenizer with func to run extension, but fall back if false
        tokenizer[prop] = (...args) => {
          let ret = pack.tokenizer[prop].apply(tokenizer, args);
          if (ret === false) {
            ret = prevTokenizer.apply(tokenizer, args);
          }
          return ret;
        };
      }
      opts.tokenizer = tokenizer;
    }

    // ==-- Parse Hooks extensions --== //
    if (pack.hooks) {
      const hooks = marked.defaults.hooks || new Hooks();
      for (const prop in pack.hooks) {
        const prevHook = hooks[prop];
        if (Hooks.passThroughHooks.has(prop)) {
          hooks[prop] = (arg) => {
            if (marked.defaults.async) {
              return Promise.resolve(pack.hooks[prop].call(hooks, arg)).then(ret => {
                return prevHook.call(hooks, ret);
              });
            }

            const ret = pack.hooks[prop].call(hooks, arg);
            return prevHook.call(hooks, ret);
          };
        } else {
          hooks[prop] = (...args) => {
            let ret = pack.hooks[prop].apply(hooks, args);
            if (ret === false) {
              ret = prevHook.apply(hooks, args);
            }
            return ret;
          };
        }
      }
      opts.hooks = hooks;
    }

    // ==-- Parse WalkTokens extensions --== //
    if (pack.walkTokens) {
      const walkTokens = marked.defaults.walkTokens;
      opts.walkTokens = function(token) {
        let values = [];
        values.push(pack.walkTokens.call(this, token));
        if (walkTokens) {
          values = values.concat(walkTokens.call(this, token));
        }
        return values;
      };
    }

    marked.setOptions(opts);
  });
};

/**
 * Run callback for every token
 */

marked.walkTokens = function(tokens, callback) {
  let values = [];
  for (const token of tokens) {
    values = values.concat(callback.call(marked, token));
    switch (token.type) {
      case 'table': {
        for (const cell of token.header) {
          values = values.concat(marked.walkTokens(cell.tokens, callback));
        }
        for (const row of token.rows) {
          for (const cell of row) {
            values = values.concat(marked.walkTokens(cell.tokens, callback));
          }
        }
        break;
      }
      case 'list': {
        values = values.concat(marked.walkTokens(token.items, callback));
        break;
      }
      default: {
        if (marked.defaults.extensions && marked.defaults.extensions.childTokens && marked.defaults.extensions.childTokens[token.type]) { // Walk any extensions
          marked.defaults.extensions.childTokens[token.type].forEach(function(childTokens) {
            values = values.concat(marked.walkTokens(token[childTokens], callback));
          });
        } else if (token.tokens) {
          values = values.concat(marked.walkTokens(token.tokens, callback));
        }
      }
    }
  }
  return values;
};

/**
 * Parse Inline
 * @param {string} src
 */
marked.parseInline = parseMarkdown(Lexer.lexInline, Parser$1.parseInline);

/**
 * Expose
 */
marked.Parser = Parser$1;
marked.parser = Parser$1.parse;
marked.Renderer = Renderer;
marked.TextRenderer = TextRenderer;
marked.Lexer = Lexer;
marked.lexer = Lexer.lex;
marked.Tokenizer = Tokenizer;
marked.Slugger = Slugger;
marked.Hooks = Hooks;
marked.parse = marked;

marked.options;
marked.setOptions;
marked.use;
marked.walkTokens;
marked.parseInline;
Parser$1.parse;
Lexer.lex;

const key = {};

/* node_modules/svelte-markdown/src/renderers/Heading.svelte generated by Svelte v3.59.2 */
const file$k = "node_modules/svelte-markdown/src/renderers/Heading.svelte";

// (28:0) {:else}
function create_else_block$3(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text(/*raw*/ ctx[1]);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*raw*/ 2) set_data_dev(t, /*raw*/ ctx[1]);
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block$3.name,
		type: "else",
		source: "(28:0) {:else}",
		ctx
	});

	return block;
}

// (26:22) 
function create_if_block_5$1(ctx) {
	let h6;
	let current;
	const default_slot_template = /*#slots*/ ctx[5].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);

	const block = {
		c: function create() {
			h6 = element("h6");
			if (default_slot) default_slot.c();
			attr_dev(h6, "id", /*id*/ ctx[2]);
			add_location(h6, file$k, 26, 2, 596);
		},
		m: function mount(target, anchor) {
			insert_dev(target, h6, anchor);

			if (default_slot) {
				default_slot.m(h6, null);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 16)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[4],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[4])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[4], dirty, null),
						null
					);
				}
			}

			if (!current || dirty & /*id*/ 4) {
				attr_dev(h6, "id", /*id*/ ctx[2]);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(h6);
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_5$1.name,
		type: "if",
		source: "(26:22) ",
		ctx
	});

	return block;
}

// (24:22) 
function create_if_block_4$1(ctx) {
	let h5;
	let current;
	const default_slot_template = /*#slots*/ ctx[5].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);

	const block = {
		c: function create() {
			h5 = element("h5");
			if (default_slot) default_slot.c();
			attr_dev(h5, "id", /*id*/ ctx[2]);
			add_location(h5, file$k, 24, 2, 543);
		},
		m: function mount(target, anchor) {
			insert_dev(target, h5, anchor);

			if (default_slot) {
				default_slot.m(h5, null);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 16)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[4],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[4])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[4], dirty, null),
						null
					);
				}
			}

			if (!current || dirty & /*id*/ 4) {
				attr_dev(h5, "id", /*id*/ ctx[2]);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(h5);
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_4$1.name,
		type: "if",
		source: "(24:22) ",
		ctx
	});

	return block;
}

// (22:22) 
function create_if_block_3$1(ctx) {
	let h4;
	let current;
	const default_slot_template = /*#slots*/ ctx[5].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);

	const block = {
		c: function create() {
			h4 = element("h4");
			if (default_slot) default_slot.c();
			attr_dev(h4, "id", /*id*/ ctx[2]);
			add_location(h4, file$k, 22, 2, 490);
		},
		m: function mount(target, anchor) {
			insert_dev(target, h4, anchor);

			if (default_slot) {
				default_slot.m(h4, null);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 16)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[4],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[4])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[4], dirty, null),
						null
					);
				}
			}

			if (!current || dirty & /*id*/ 4) {
				attr_dev(h4, "id", /*id*/ ctx[2]);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(h4);
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_3$1.name,
		type: "if",
		source: "(22:22) ",
		ctx
	});

	return block;
}

// (20:22) 
function create_if_block_2$2(ctx) {
	let h3;
	let current;
	const default_slot_template = /*#slots*/ ctx[5].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);

	const block = {
		c: function create() {
			h3 = element("h3");
			if (default_slot) default_slot.c();
			attr_dev(h3, "id", /*id*/ ctx[2]);
			add_location(h3, file$k, 20, 2, 437);
		},
		m: function mount(target, anchor) {
			insert_dev(target, h3, anchor);

			if (default_slot) {
				default_slot.m(h3, null);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 16)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[4],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[4])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[4], dirty, null),
						null
					);
				}
			}

			if (!current || dirty & /*id*/ 4) {
				attr_dev(h3, "id", /*id*/ ctx[2]);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(h3);
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2$2.name,
		type: "if",
		source: "(20:22) ",
		ctx
	});

	return block;
}

// (18:22) 
function create_if_block_1$2(ctx) {
	let h2;
	let current;
	const default_slot_template = /*#slots*/ ctx[5].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);

	const block = {
		c: function create() {
			h2 = element("h2");
			if (default_slot) default_slot.c();
			attr_dev(h2, "id", /*id*/ ctx[2]);
			add_location(h2, file$k, 18, 2, 384);
		},
		m: function mount(target, anchor) {
			insert_dev(target, h2, anchor);

			if (default_slot) {
				default_slot.m(h2, null);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 16)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[4],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[4])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[4], dirty, null),
						null
					);
				}
			}

			if (!current || dirty & /*id*/ 4) {
				attr_dev(h2, "id", /*id*/ ctx[2]);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(h2);
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$2.name,
		type: "if",
		source: "(18:22) ",
		ctx
	});

	return block;
}

// (16:0) {#if depth === 1}
function create_if_block$4(ctx) {
	let h1;
	let current;
	const default_slot_template = /*#slots*/ ctx[5].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);

	const block = {
		c: function create() {
			h1 = element("h1");
			if (default_slot) default_slot.c();
			attr_dev(h1, "id", /*id*/ ctx[2]);
			add_location(h1, file$k, 16, 2, 331);
		},
		m: function mount(target, anchor) {
			insert_dev(target, h1, anchor);

			if (default_slot) {
				default_slot.m(h1, null);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 16)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[4],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[4])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[4], dirty, null),
						null
					);
				}
			}

			if (!current || dirty & /*id*/ 4) {
				attr_dev(h1, "id", /*id*/ ctx[2]);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(h1);
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$4.name,
		type: "if",
		source: "(16:0) {#if depth === 1}",
		ctx
	});

	return block;
}

function create_fragment$n(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;

	const if_block_creators = [
		create_if_block$4,
		create_if_block_1$2,
		create_if_block_2$2,
		create_if_block_3$1,
		create_if_block_4$1,
		create_if_block_5$1,
		create_else_block$3
	];

	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*depth*/ ctx[0] === 1) return 0;
		if (/*depth*/ ctx[0] === 2) return 1;
		if (/*depth*/ ctx[0] === 3) return 2;
		if (/*depth*/ ctx[0] === 4) return 3;
		if (/*depth*/ ctx[0] === 5) return 4;
		if (/*depth*/ ctx[0] === 6) return 5;
		return 6;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$n.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$n($$self, $$props, $$invalidate) {
	let id;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Heading', slots, ['default']);
	let { depth } = $$props;
	let { raw } = $$props;
	let { text } = $$props;
	const { slug, getOptions } = getContext(key);
	const options = getOptions();

	$$self.$$.on_mount.push(function () {
		if (depth === undefined && !('depth' in $$props || $$self.$$.bound[$$self.$$.props['depth']])) {
			console.warn("<Heading> was created without expected prop 'depth'");
		}

		if (raw === undefined && !('raw' in $$props || $$self.$$.bound[$$self.$$.props['raw']])) {
			console.warn("<Heading> was created without expected prop 'raw'");
		}

		if (text === undefined && !('text' in $$props || $$self.$$.bound[$$self.$$.props['text']])) {
			console.warn("<Heading> was created without expected prop 'text'");
		}
	});

	const writable_props = ['depth', 'raw', 'text'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Heading> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('depth' in $$props) $$invalidate(0, depth = $$props.depth);
		if ('raw' in $$props) $$invalidate(1, raw = $$props.raw);
		if ('text' in $$props) $$invalidate(3, text = $$props.text);
		if ('$$scope' in $$props) $$invalidate(4, $$scope = $$props.$$scope);
	};

	$$self.$capture_state = () => ({
		getContext,
		key,
		depth,
		raw,
		text,
		slug,
		getOptions,
		options,
		id
	});

	$$self.$inject_state = $$props => {
		if ('depth' in $$props) $$invalidate(0, depth = $$props.depth);
		if ('raw' in $$props) $$invalidate(1, raw = $$props.raw);
		if ('text' in $$props) $$invalidate(3, text = $$props.text);
		if ('id' in $$props) $$invalidate(2, id = $$props.id);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*text*/ 8) {
			$$invalidate(2, id = options.headerIds
			? options.headerPrefix + slug(text)
			: undefined);
		}
	};

	return [depth, raw, id, text, $$scope, slots];
}

class Heading extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$n, create_fragment$n, safe_not_equal, { depth: 0, raw: 1, text: 3 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Heading",
			options,
			id: create_fragment$n.name
		});
	}

	get depth() {
		throw new Error("<Heading>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set depth(value) {
		throw new Error("<Heading>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get raw() {
		throw new Error("<Heading>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set raw(value) {
		throw new Error("<Heading>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get text() {
		throw new Error("<Heading>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set text(value) {
		throw new Error("<Heading>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* node_modules/svelte-markdown/src/renderers/Paragraph.svelte generated by Svelte v3.59.2 */

const file$j = "node_modules/svelte-markdown/src/renderers/Paragraph.svelte";

function create_fragment$m(ctx) {
	let p;
	let current;
	const default_slot_template = /*#slots*/ ctx[1].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

	const block = {
		c: function create() {
			p = element("p");
			if (default_slot) default_slot.c();
			add_location(p, file$j, 0, 0, 0);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, p, anchor);

			if (default_slot) {
				default_slot.m(p, null);
			}

			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[0],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
						null
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(p);
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$m.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$m($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Paragraph', slots, ['default']);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Paragraph> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
	};

	return [$$scope, slots];
}

class Paragraph extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$m, create_fragment$m, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Paragraph",
			options,
			id: create_fragment$m.name
		});
	}
}

/* node_modules/svelte-markdown/src/renderers/Text.svelte generated by Svelte v3.59.2 */

function create_fragment$l(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[3].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

	const block = {
		c: function create() {
			if (default_slot) default_slot.c();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[2],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
						null
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$l.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$l($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Text', slots, ['default']);
	let { text } = $$props;
	let { raw } = $$props;

	$$self.$$.on_mount.push(function () {
		if (text === undefined && !('text' in $$props || $$self.$$.bound[$$self.$$.props['text']])) {
			console.warn("<Text> was created without expected prop 'text'");
		}

		if (raw === undefined && !('raw' in $$props || $$self.$$.bound[$$self.$$.props['raw']])) {
			console.warn("<Text> was created without expected prop 'raw'");
		}
	});

	const writable_props = ['text', 'raw'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Text> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('text' in $$props) $$invalidate(0, text = $$props.text);
		if ('raw' in $$props) $$invalidate(1, raw = $$props.raw);
		if ('$$scope' in $$props) $$invalidate(2, $$scope = $$props.$$scope);
	};

	$$self.$capture_state = () => ({ text, raw });

	$$self.$inject_state = $$props => {
		if ('text' in $$props) $$invalidate(0, text = $$props.text);
		if ('raw' in $$props) $$invalidate(1, raw = $$props.raw);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [text, raw, $$scope, slots];
}

class Text extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$l, create_fragment$l, safe_not_equal, { text: 0, raw: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Text",
			options,
			id: create_fragment$l.name
		});
	}

	get text() {
		throw new Error("<Text>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set text(value) {
		throw new Error("<Text>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get raw() {
		throw new Error("<Text>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set raw(value) {
		throw new Error("<Text>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* node_modules/svelte-markdown/src/renderers/Image.svelte generated by Svelte v3.59.2 */

const file$i = "node_modules/svelte-markdown/src/renderers/Image.svelte";

function create_fragment$k(ctx) {
	let img;
	let img_src_value;

	const block = {
		c: function create() {
			img = element("img");
			if (!src_url_equal(img.src, img_src_value = /*href*/ ctx[0])) attr_dev(img, "src", img_src_value);
			attr_dev(img, "title", /*title*/ ctx[1]);
			attr_dev(img, "alt", /*text*/ ctx[2]);
			add_location(img, file$i, 6, 0, 97);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, img, anchor);
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*href*/ 1 && !src_url_equal(img.src, img_src_value = /*href*/ ctx[0])) {
				attr_dev(img, "src", img_src_value);
			}

			if (dirty & /*title*/ 2) {
				attr_dev(img, "title", /*title*/ ctx[1]);
			}

			if (dirty & /*text*/ 4) {
				attr_dev(img, "alt", /*text*/ ctx[2]);
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(img);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$k.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$k($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Image', slots, []);
	let { href = '' } = $$props;
	let { title = undefined } = $$props;
	let { text = '' } = $$props;
	const writable_props = ['href', 'title', 'text'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Image> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('href' in $$props) $$invalidate(0, href = $$props.href);
		if ('title' in $$props) $$invalidate(1, title = $$props.title);
		if ('text' in $$props) $$invalidate(2, text = $$props.text);
	};

	$$self.$capture_state = () => ({ href, title, text });

	$$self.$inject_state = $$props => {
		if ('href' in $$props) $$invalidate(0, href = $$props.href);
		if ('title' in $$props) $$invalidate(1, title = $$props.title);
		if ('text' in $$props) $$invalidate(2, text = $$props.text);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [href, title, text];
}

class Image extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$k, create_fragment$k, safe_not_equal, { href: 0, title: 1, text: 2 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Image",
			options,
			id: create_fragment$k.name
		});
	}

	get href() {
		throw new Error("<Image>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set href(value) {
		throw new Error("<Image>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get title() {
		throw new Error("<Image>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set title(value) {
		throw new Error("<Image>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get text() {
		throw new Error("<Image>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set text(value) {
		throw new Error("<Image>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* node_modules/svelte-markdown/src/renderers/Link.svelte generated by Svelte v3.59.2 */

const file$h = "node_modules/svelte-markdown/src/renderers/Link.svelte";

function create_fragment$j(ctx) {
	let a;
	let current;
	const default_slot_template = /*#slots*/ ctx[3].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

	const block = {
		c: function create() {
			a = element("a");
			if (default_slot) default_slot.c();
			attr_dev(a, "href", /*href*/ ctx[0]);
			attr_dev(a, "title", /*title*/ ctx[1]);
			add_location(a, file$h, 5, 0, 74);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, a, anchor);

			if (default_slot) {
				default_slot.m(a, null);
			}

			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[2],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
						null
					);
				}
			}

			if (!current || dirty & /*href*/ 1) {
				attr_dev(a, "href", /*href*/ ctx[0]);
			}

			if (!current || dirty & /*title*/ 2) {
				attr_dev(a, "title", /*title*/ ctx[1]);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(a);
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$j.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$j($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Link', slots, ['default']);
	let { href = '' } = $$props;
	let { title = undefined } = $$props;
	const writable_props = ['href', 'title'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Link> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('href' in $$props) $$invalidate(0, href = $$props.href);
		if ('title' in $$props) $$invalidate(1, title = $$props.title);
		if ('$$scope' in $$props) $$invalidate(2, $$scope = $$props.$$scope);
	};

	$$self.$capture_state = () => ({ href, title });

	$$self.$inject_state = $$props => {
		if ('href' in $$props) $$invalidate(0, href = $$props.href);
		if ('title' in $$props) $$invalidate(1, title = $$props.title);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [href, title, $$scope, slots];
}

class Link extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$j, create_fragment$j, safe_not_equal, { href: 0, title: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Link",
			options,
			id: create_fragment$j.name
		});
	}

	get href() {
		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set href(value) {
		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get title() {
		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set title(value) {
		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* node_modules/svelte-markdown/src/renderers/Em.svelte generated by Svelte v3.59.2 */

const file$g = "node_modules/svelte-markdown/src/renderers/Em.svelte";

function create_fragment$i(ctx) {
	let em;
	let current;
	const default_slot_template = /*#slots*/ ctx[1].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

	const block = {
		c: function create() {
			em = element("em");
			if (default_slot) default_slot.c();
			add_location(em, file$g, 0, 0, 0);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, em, anchor);

			if (default_slot) {
				default_slot.m(em, null);
			}

			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[0],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
						null
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(em);
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$i.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$i($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Em', slots, ['default']);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Em> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
	};

	return [$$scope, slots];
}

class Em extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$i, create_fragment$i, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Em",
			options,
			id: create_fragment$i.name
		});
	}
}

/* node_modules/svelte-markdown/src/renderers/Del.svelte generated by Svelte v3.59.2 */

const file$f = "node_modules/svelte-markdown/src/renderers/Del.svelte";

function create_fragment$h(ctx) {
	let del;
	let current;
	const default_slot_template = /*#slots*/ ctx[1].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

	const block = {
		c: function create() {
			del = element("del");
			if (default_slot) default_slot.c();
			add_location(del, file$f, 0, 0, 0);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, del, anchor);

			if (default_slot) {
				default_slot.m(del, null);
			}

			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[0],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
						null
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(del);
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$h.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$h($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Del', slots, ['default']);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Del> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
	};

	return [$$scope, slots];
}

class Del extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$h, create_fragment$h, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Del",
			options,
			id: create_fragment$h.name
		});
	}
}

/* node_modules/svelte-markdown/src/renderers/Codespan.svelte generated by Svelte v3.59.2 */

const file$e = "node_modules/svelte-markdown/src/renderers/Codespan.svelte";

function create_fragment$g(ctx) {
	let code;
	let t_value = /*raw*/ ctx[0].replace(/`/g, '') + "";
	let t;

	const block = {
		c: function create() {
			code = element("code");
			t = text(t_value);
			add_location(code, file$e, 4, 0, 37);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, code, anchor);
			append_dev(code, t);
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*raw*/ 1 && t_value !== (t_value = /*raw*/ ctx[0].replace(/`/g, '') + "")) set_data_dev(t, t_value);
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(code);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$g.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$g($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Codespan', slots, []);
	let { raw } = $$props;

	$$self.$$.on_mount.push(function () {
		if (raw === undefined && !('raw' in $$props || $$self.$$.bound[$$self.$$.props['raw']])) {
			console.warn("<Codespan> was created without expected prop 'raw'");
		}
	});

	const writable_props = ['raw'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Codespan> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('raw' in $$props) $$invalidate(0, raw = $$props.raw);
	};

	$$self.$capture_state = () => ({ raw });

	$$self.$inject_state = $$props => {
		if ('raw' in $$props) $$invalidate(0, raw = $$props.raw);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [raw];
}

class Codespan extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$g, create_fragment$g, safe_not_equal, { raw: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Codespan",
			options,
			id: create_fragment$g.name
		});
	}

	get raw() {
		throw new Error("<Codespan>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set raw(value) {
		throw new Error("<Codespan>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* node_modules/svelte-markdown/src/renderers/Strong.svelte generated by Svelte v3.59.2 */

const file$d = "node_modules/svelte-markdown/src/renderers/Strong.svelte";

function create_fragment$f(ctx) {
	let strong;
	let current;
	const default_slot_template = /*#slots*/ ctx[1].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

	const block = {
		c: function create() {
			strong = element("strong");
			if (default_slot) default_slot.c();
			add_location(strong, file$d, 0, 0, 0);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, strong, anchor);

			if (default_slot) {
				default_slot.m(strong, null);
			}

			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[0],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
						null
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(strong);
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$f.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$f($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Strong', slots, ['default']);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Strong> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
	};

	return [$$scope, slots];
}

class Strong extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$f, create_fragment$f, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Strong",
			options,
			id: create_fragment$f.name
		});
	}
}

/* node_modules/svelte-markdown/src/renderers/Table.svelte generated by Svelte v3.59.2 */

const file$c = "node_modules/svelte-markdown/src/renderers/Table.svelte";

function create_fragment$e(ctx) {
	let table;
	let current;
	const default_slot_template = /*#slots*/ ctx[1].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

	const block = {
		c: function create() {
			table = element("table");
			if (default_slot) default_slot.c();
			add_location(table, file$c, 0, 0, 0);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, table, anchor);

			if (default_slot) {
				default_slot.m(table, null);
			}

			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[0],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
						null
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(table);
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$e.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$e($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Table', slots, ['default']);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Table> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
	};

	return [$$scope, slots];
}

class Table extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$e, create_fragment$e, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Table",
			options,
			id: create_fragment$e.name
		});
	}
}

/* node_modules/svelte-markdown/src/renderers/TableHead.svelte generated by Svelte v3.59.2 */

const file$b = "node_modules/svelte-markdown/src/renderers/TableHead.svelte";

function create_fragment$d(ctx) {
	let thead;
	let current;
	const default_slot_template = /*#slots*/ ctx[1].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

	const block = {
		c: function create() {
			thead = element("thead");
			if (default_slot) default_slot.c();
			add_location(thead, file$b, 0, 0, 0);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, thead, anchor);

			if (default_slot) {
				default_slot.m(thead, null);
			}

			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[0],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
						null
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(thead);
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$d.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$d($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('TableHead', slots, ['default']);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<TableHead> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
	};

	return [$$scope, slots];
}

class TableHead extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$d, create_fragment$d, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "TableHead",
			options,
			id: create_fragment$d.name
		});
	}
}

/* node_modules/svelte-markdown/src/renderers/TableBody.svelte generated by Svelte v3.59.2 */

const file$a = "node_modules/svelte-markdown/src/renderers/TableBody.svelte";

function create_fragment$c(ctx) {
	let tbody;
	let current;
	const default_slot_template = /*#slots*/ ctx[1].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

	const block = {
		c: function create() {
			tbody = element("tbody");
			if (default_slot) default_slot.c();
			add_location(tbody, file$a, 0, 0, 0);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, tbody, anchor);

			if (default_slot) {
				default_slot.m(tbody, null);
			}

			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[0],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
						null
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(tbody);
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$c.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$c($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('TableBody', slots, ['default']);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<TableBody> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
	};

	return [$$scope, slots];
}

class TableBody extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$c, create_fragment$c, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "TableBody",
			options,
			id: create_fragment$c.name
		});
	}
}

/* node_modules/svelte-markdown/src/renderers/TableRow.svelte generated by Svelte v3.59.2 */

const file$9 = "node_modules/svelte-markdown/src/renderers/TableRow.svelte";

function create_fragment$b(ctx) {
	let tr;
	let current;
	const default_slot_template = /*#slots*/ ctx[1].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

	const block = {
		c: function create() {
			tr = element("tr");
			if (default_slot) default_slot.c();
			add_location(tr, file$9, 0, 0, 0);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, tr, anchor);

			if (default_slot) {
				default_slot.m(tr, null);
			}

			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[0],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
						null
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(tr);
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$b.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$b($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('TableRow', slots, ['default']);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<TableRow> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
	};

	return [$$scope, slots];
}

class TableRow extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$b, create_fragment$b, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "TableRow",
			options,
			id: create_fragment$b.name
		});
	}
}

/* node_modules/svelte-markdown/src/renderers/TableCell.svelte generated by Svelte v3.59.2 */

const file$8 = "node_modules/svelte-markdown/src/renderers/TableCell.svelte";

// (8:0) {:else}
function create_else_block$2(ctx) {
	let td;
	let current;
	const default_slot_template = /*#slots*/ ctx[3].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

	const block = {
		c: function create() {
			td = element("td");
			if (default_slot) default_slot.c();
			attr_dev(td, "align", /*align*/ ctx[1]);
			add_location(td, file$8, 8, 2, 115);
		},
		m: function mount(target, anchor) {
			insert_dev(target, td, anchor);

			if (default_slot) {
				default_slot.m(td, null);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[2],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
						null
					);
				}
			}

			if (!current || dirty & /*align*/ 2) {
				attr_dev(td, "align", /*align*/ ctx[1]);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(td);
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block$2.name,
		type: "else",
		source: "(8:0) {:else}",
		ctx
	});

	return block;
}

// (6:0) {#if header}
function create_if_block$3(ctx) {
	let th;
	let current;
	const default_slot_template = /*#slots*/ ctx[3].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

	const block = {
		c: function create() {
			th = element("th");
			if (default_slot) default_slot.c();
			attr_dev(th, "align", /*align*/ ctx[1]);
			add_location(th, file$8, 6, 2, 74);
		},
		m: function mount(target, anchor) {
			insert_dev(target, th, anchor);

			if (default_slot) {
				default_slot.m(th, null);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[2],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
						null
					);
				}
			}

			if (!current || dirty & /*align*/ 2) {
				attr_dev(th, "align", /*align*/ ctx[1]);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(th);
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$3.name,
		type: "if",
		source: "(6:0) {#if header}",
		ctx
	});

	return block;
}

function create_fragment$a(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block$3, create_else_block$2];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*header*/ ctx[0]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$a.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$a($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('TableCell', slots, ['default']);
	let { header } = $$props;
	let { align } = $$props;

	$$self.$$.on_mount.push(function () {
		if (header === undefined && !('header' in $$props || $$self.$$.bound[$$self.$$.props['header']])) {
			console.warn("<TableCell> was created without expected prop 'header'");
		}

		if (align === undefined && !('align' in $$props || $$self.$$.bound[$$self.$$.props['align']])) {
			console.warn("<TableCell> was created without expected prop 'align'");
		}
	});

	const writable_props = ['header', 'align'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<TableCell> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('header' in $$props) $$invalidate(0, header = $$props.header);
		if ('align' in $$props) $$invalidate(1, align = $$props.align);
		if ('$$scope' in $$props) $$invalidate(2, $$scope = $$props.$$scope);
	};

	$$self.$capture_state = () => ({ header, align });

	$$self.$inject_state = $$props => {
		if ('header' in $$props) $$invalidate(0, header = $$props.header);
		if ('align' in $$props) $$invalidate(1, align = $$props.align);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [header, align, $$scope, slots];
}

class TableCell extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$a, create_fragment$a, safe_not_equal, { header: 0, align: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "TableCell",
			options,
			id: create_fragment$a.name
		});
	}

	get header() {
		throw new Error("<TableCell>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set header(value) {
		throw new Error("<TableCell>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get align() {
		throw new Error("<TableCell>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set align(value) {
		throw new Error("<TableCell>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* node_modules/svelte-markdown/src/renderers/List.svelte generated by Svelte v3.59.2 */

const file$7 = "node_modules/svelte-markdown/src/renderers/List.svelte";

// (8:0) {:else}
function create_else_block$1(ctx) {
	let ul;
	let current;
	const default_slot_template = /*#slots*/ ctx[3].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

	const block = {
		c: function create() {
			ul = element("ul");
			if (default_slot) default_slot.c();
			add_location(ul, file$7, 8, 2, 117);
		},
		m: function mount(target, anchor) {
			insert_dev(target, ul, anchor);

			if (default_slot) {
				default_slot.m(ul, null);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[2],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
						null
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(ul);
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block$1.name,
		type: "else",
		source: "(8:0) {:else}",
		ctx
	});

	return block;
}

// (6:0) {#if ordered}
function create_if_block$2(ctx) {
	let ol;
	let current;
	const default_slot_template = /*#slots*/ ctx[3].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

	const block = {
		c: function create() {
			ol = element("ol");
			if (default_slot) default_slot.c();
			attr_dev(ol, "start", /*start*/ ctx[1]);
			add_location(ol, file$7, 6, 2, 76);
		},
		m: function mount(target, anchor) {
			insert_dev(target, ol, anchor);

			if (default_slot) {
				default_slot.m(ol, null);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[2],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
						null
					);
				}
			}

			if (!current || dirty & /*start*/ 2) {
				attr_dev(ol, "start", /*start*/ ctx[1]);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(ol);
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$2.name,
		type: "if",
		source: "(6:0) {#if ordered}",
		ctx
	});

	return block;
}

function create_fragment$9(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block$2, create_else_block$1];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*ordered*/ ctx[0]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$9.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$9($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('List', slots, ['default']);
	let { ordered } = $$props;
	let { start } = $$props;

	$$self.$$.on_mount.push(function () {
		if (ordered === undefined && !('ordered' in $$props || $$self.$$.bound[$$self.$$.props['ordered']])) {
			console.warn("<List> was created without expected prop 'ordered'");
		}

		if (start === undefined && !('start' in $$props || $$self.$$.bound[$$self.$$.props['start']])) {
			console.warn("<List> was created without expected prop 'start'");
		}
	});

	const writable_props = ['ordered', 'start'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<List> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('ordered' in $$props) $$invalidate(0, ordered = $$props.ordered);
		if ('start' in $$props) $$invalidate(1, start = $$props.start);
		if ('$$scope' in $$props) $$invalidate(2, $$scope = $$props.$$scope);
	};

	$$self.$capture_state = () => ({ ordered, start });

	$$self.$inject_state = $$props => {
		if ('ordered' in $$props) $$invalidate(0, ordered = $$props.ordered);
		if ('start' in $$props) $$invalidate(1, start = $$props.start);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [ordered, start, $$scope, slots];
}

class List extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$9, create_fragment$9, safe_not_equal, { ordered: 0, start: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "List",
			options,
			id: create_fragment$9.name
		});
	}

	get ordered() {
		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set ordered(value) {
		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get start() {
		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set start(value) {
		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* node_modules/svelte-markdown/src/renderers/ListItem.svelte generated by Svelte v3.59.2 */

const file$6 = "node_modules/svelte-markdown/src/renderers/ListItem.svelte";

function create_fragment$8(ctx) {
	let li;
	let current;
	const default_slot_template = /*#slots*/ ctx[1].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

	const block = {
		c: function create() {
			li = element("li");
			if (default_slot) default_slot.c();
			add_location(li, file$6, 0, 0, 0);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, li, anchor);

			if (default_slot) {
				default_slot.m(li, null);
			}

			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[0],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
						null
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(li);
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$8.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$8($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('ListItem', slots, ['default']);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ListItem> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
	};

	return [$$scope, slots];
}

class ListItem extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$8, create_fragment$8, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ListItem",
			options,
			id: create_fragment$8.name
		});
	}
}

/* node_modules/svelte-markdown/src/renderers/Hr.svelte generated by Svelte v3.59.2 */

const file$5 = "node_modules/svelte-markdown/src/renderers/Hr.svelte";

function create_fragment$7(ctx) {
	let hr;

	const block = {
		c: function create() {
			hr = element("hr");
			add_location(hr, file$5, 0, 0, 0);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, hr, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(hr);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$7.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$7($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Hr', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Hr> was created with unknown prop '${key}'`);
	});

	return [];
}

class Hr extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$7, create_fragment$7, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Hr",
			options,
			id: create_fragment$7.name
		});
	}
}

/* node_modules/svelte-markdown/src/renderers/Html.svelte generated by Svelte v3.59.2 */

function create_fragment$6(ctx) {
	let html_tag;
	let html_anchor;

	const block = {
		c: function create() {
			html_tag = new HtmlTag(false);
			html_anchor = empty();
			html_tag.a = html_anchor;
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			html_tag.m(/*text*/ ctx[0], target, anchor);
			insert_dev(target, html_anchor, anchor);
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*text*/ 1) html_tag.p(/*text*/ ctx[0]);
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(html_anchor);
			if (detaching) html_tag.d();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$6.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$6($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Html', slots, []);
	let { text } = $$props;

	$$self.$$.on_mount.push(function () {
		if (text === undefined && !('text' in $$props || $$self.$$.bound[$$self.$$.props['text']])) {
			console.warn("<Html> was created without expected prop 'text'");
		}
	});

	const writable_props = ['text'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Html> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('text' in $$props) $$invalidate(0, text = $$props.text);
	};

	$$self.$capture_state = () => ({ text });

	$$self.$inject_state = $$props => {
		if ('text' in $$props) $$invalidate(0, text = $$props.text);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [text];
}

class Html extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$6, create_fragment$6, safe_not_equal, { text: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Html",
			options,
			id: create_fragment$6.name
		});
	}

	get text() {
		throw new Error("<Html>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set text(value) {
		throw new Error("<Html>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* node_modules/svelte-markdown/src/renderers/Blockquote.svelte generated by Svelte v3.59.2 */

const file$4 = "node_modules/svelte-markdown/src/renderers/Blockquote.svelte";

function create_fragment$5(ctx) {
	let blockquote;
	let current;
	const default_slot_template = /*#slots*/ ctx[1].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

	const block = {
		c: function create() {
			blockquote = element("blockquote");
			if (default_slot) default_slot.c();
			add_location(blockquote, file$4, 0, 0, 0);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, blockquote, anchor);

			if (default_slot) {
				default_slot.m(blockquote, null);
			}

			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[0],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
						null
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(blockquote);
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$5.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$5($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Blockquote', slots, ['default']);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Blockquote> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
	};

	return [$$scope, slots];
}

class Blockquote extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$5, create_fragment$5, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Blockquote",
			options,
			id: create_fragment$5.name
		});
	}
}

/* node_modules/svelte-markdown/src/renderers/Code.svelte generated by Svelte v3.59.2 */

const file$3 = "node_modules/svelte-markdown/src/renderers/Code.svelte";

function create_fragment$4(ctx) {
	let pre;
	let code;
	let t;

	const block = {
		c: function create() {
			pre = element("pre");
			code = element("code");
			t = text(/*text*/ ctx[1]);
			add_location(code, file$3, 5, 18, 74);
			attr_dev(pre, "class", /*lang*/ ctx[0]);
			add_location(pre, file$3, 5, 0, 56);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, pre, anchor);
			append_dev(pre, code);
			append_dev(code, t);
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*text*/ 2) set_data_dev(t, /*text*/ ctx[1]);

			if (dirty & /*lang*/ 1) {
				attr_dev(pre, "class", /*lang*/ ctx[0]);
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(pre);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$4.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$4($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Code', slots, []);
	let { lang } = $$props;
	let { text } = $$props;

	$$self.$$.on_mount.push(function () {
		if (lang === undefined && !('lang' in $$props || $$self.$$.bound[$$self.$$.props['lang']])) {
			console.warn("<Code> was created without expected prop 'lang'");
		}

		if (text === undefined && !('text' in $$props || $$self.$$.bound[$$self.$$.props['text']])) {
			console.warn("<Code> was created without expected prop 'text'");
		}
	});

	const writable_props = ['lang', 'text'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Code> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('lang' in $$props) $$invalidate(0, lang = $$props.lang);
		if ('text' in $$props) $$invalidate(1, text = $$props.text);
	};

	$$self.$capture_state = () => ({ lang, text });

	$$self.$inject_state = $$props => {
		if ('lang' in $$props) $$invalidate(0, lang = $$props.lang);
		if ('text' in $$props) $$invalidate(1, text = $$props.text);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [lang, text];
}

class Code extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$4, create_fragment$4, safe_not_equal, { lang: 0, text: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Code",
			options,
			id: create_fragment$4.name
		});
	}

	get lang() {
		throw new Error("<Code>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set lang(value) {
		throw new Error("<Code>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get text() {
		throw new Error("<Code>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set text(value) {
		throw new Error("<Code>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* node_modules/svelte-markdown/src/renderers/Br.svelte generated by Svelte v3.59.2 */

const file$2 = "node_modules/svelte-markdown/src/renderers/Br.svelte";

function create_fragment$3(ctx) {
	let br;
	let current;
	const default_slot_template = /*#slots*/ ctx[1].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

	const block = {
		c: function create() {
			br = element("br");
			if (default_slot) default_slot.c();
			add_location(br, file$2, 0, 0, 0);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, br, anchor);

			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[0],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
						null
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(br);
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Br', slots, ['default']);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Br> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
	};

	return [$$scope, slots];
}

class Br extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$3, create_fragment$3, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Br",
			options,
			id: create_fragment$3.name
		});
	}
}

const defaultRenderers = {
  heading: Heading,
  paragraph: Paragraph,
  text: Text,
  image: Image,
  link: Link,
  em: Em,
  strong: Strong,
  codespan: Codespan,
  del: Del,
  table: Table,
  tablehead: TableHead,
  tablebody: TableBody,
  tablerow: TableRow,
  tablecell: TableCell,
  list: List,
  orderedlistitem: null,
  unorderedlistitem: null,
  listitem: ListItem,
  hr: Hr,
  html: Html,
  blockquote: Blockquote,
  code: Code,
  br: Br,
};
const defaultOptions$1 = {
  baseUrl: null,
  breaks: false,
  gfm: true,
  headerIds: true,
  headerPrefix: '',
  highlight: null,
  langPrefix: 'language-',
  mangle: true,
  pedantic: false,
  renderer: null,
  sanitize: false,
  sanitizer: null,
  silent: false,
  smartLists: false,
  smartypants: false,
  tokenizer: null,
  xhtml: false,
};

/* node_modules/svelte-markdown/src/SvelteMarkdown.svelte generated by Svelte v3.59.2 */

function create_fragment$2(ctx) {
	let parser;
	let current;

	parser = new Parser$2({
			props: {
				tokens: /*tokens*/ ctx[0],
				renderers: /*combinedRenderers*/ ctx[1]
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(parser.$$.fragment);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			mount_component(parser, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const parser_changes = {};
			if (dirty & /*tokens*/ 1) parser_changes.tokens = /*tokens*/ ctx[0];
			if (dirty & /*combinedRenderers*/ 2) parser_changes.renderers = /*combinedRenderers*/ ctx[1];
			parser.$set(parser_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(parser.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(parser.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(parser, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2($$self, $$props, $$invalidate) {
	let preprocessed;
	let slugger;
	let combinedOptions;
	let combinedRenderers;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('SvelteMarkdown', slots, []);
	let { source = [] } = $$props;
	let { renderers = {} } = $$props;
	let { options = {} } = $$props;
	let { isInline = false } = $$props;
	const dispatch = createEventDispatcher();
	let tokens;
	let lexer;
	let mounted;

	setContext(key, {
		slug: val => slugger ? slugger.slug(val) : '',
		getOptions: () => combinedOptions
	});

	onMount(() => {
		$$invalidate(7, mounted = true);
	});

	const writable_props = ['source', 'renderers', 'options', 'isInline'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SvelteMarkdown> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('source' in $$props) $$invalidate(2, source = $$props.source);
		if ('renderers' in $$props) $$invalidate(3, renderers = $$props.renderers);
		if ('options' in $$props) $$invalidate(4, options = $$props.options);
		if ('isInline' in $$props) $$invalidate(5, isInline = $$props.isInline);
	};

	$$self.$capture_state = () => ({
		setContext,
		createEventDispatcher,
		onMount,
		Parser: Parser$2,
		Lexer,
		Slugger,
		defaultOptions: defaultOptions$1,
		defaultRenderers,
		key,
		source,
		renderers,
		options,
		isInline,
		dispatch,
		tokens,
		lexer,
		mounted,
		preprocessed,
		combinedOptions,
		slugger,
		combinedRenderers
	});

	$$self.$inject_state = $$props => {
		if ('source' in $$props) $$invalidate(2, source = $$props.source);
		if ('renderers' in $$props) $$invalidate(3, renderers = $$props.renderers);
		if ('options' in $$props) $$invalidate(4, options = $$props.options);
		if ('isInline' in $$props) $$invalidate(5, isInline = $$props.isInline);
		if ('tokens' in $$props) $$invalidate(0, tokens = $$props.tokens);
		if ('lexer' in $$props) $$invalidate(6, lexer = $$props.lexer);
		if ('mounted' in $$props) $$invalidate(7, mounted = $$props.mounted);
		if ('preprocessed' in $$props) $$invalidate(8, preprocessed = $$props.preprocessed);
		if ('combinedOptions' in $$props) $$invalidate(9, combinedOptions = $$props.combinedOptions);
		if ('slugger' in $$props) slugger = $$props.slugger;
		if ('combinedRenderers' in $$props) $$invalidate(1, combinedRenderers = $$props.combinedRenderers);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*source*/ 4) {
			$$invalidate(8, preprocessed = Array.isArray(source));
		}

		if ($$self.$$.dirty & /*source*/ 4) {
			slugger = source ? new Slugger() : undefined;
		}

		if ($$self.$$.dirty & /*options*/ 16) {
			$$invalidate(9, combinedOptions = { ...defaultOptions$1, ...options });
		}

		if ($$self.$$.dirty & /*preprocessed, source, combinedOptions, isInline, lexer, tokens*/ 869) {
			if (preprocessed) {
				$$invalidate(0, tokens = source);
			} else {
				$$invalidate(6, lexer = new Lexer(combinedOptions));

				$$invalidate(0, tokens = isInline
				? lexer.inlineTokens(source)
				: lexer.lex(source));

				dispatch('parsed', { tokens });
			}
		}

		if ($$self.$$.dirty & /*renderers*/ 8) {
			$$invalidate(1, combinedRenderers = { ...defaultRenderers, ...renderers });
		}

		if ($$self.$$.dirty & /*mounted, preprocessed, tokens*/ 385) {
			mounted && !preprocessed && dispatch('parsed', { tokens });
		}
	};

	return [
		tokens,
		combinedRenderers,
		source,
		renderers,
		options,
		isInline,
		lexer,
		mounted,
		preprocessed,
		combinedOptions
	];
}

class SvelteMarkdown extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$1(this, options, instance$2, create_fragment$2, safe_not_equal, {
			source: 2,
			renderers: 3,
			options: 4,
			isInline: 5
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "SvelteMarkdown",
			options,
			id: create_fragment$2.name
		});
	}

	get source() {
		throw new Error("<SvelteMarkdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set source(value) {
		throw new Error("<SvelteMarkdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get renderers() {
		throw new Error("<SvelteMarkdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set renderers(value) {
		throw new Error("<SvelteMarkdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get options() {
		throw new Error("<SvelteMarkdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set options(value) {
		throw new Error("<SvelteMarkdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isInline() {
		throw new Error("<SvelteMarkdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isInline(value) {
		throw new Error("<SvelteMarkdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/components/FeedbackList.svelte generated by Svelte v3.59.2 */

const { Error: Error_1$1, Object: Object_1$1, console: console_1 } = globals;
const file$1 = "src/components/FeedbackList.svelte";

function get_each_context_5(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[158] = list[i];
	return child_ctx;
}

function get_each_context_6(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[161] = list[i];
	child_ctx[147] = i;
	return child_ctx;
}

function get_each_context_7(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[161] = list[i];
	child_ctx[147] = i;
	return child_ctx;
}

function get_each_context_2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[151] = list[i];
	child_ctx[147] = i;
	return child_ctx;
}

function get_each_context_3(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[153] = list[i];
	return child_ctx;
}

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[148] = list[i];
	return child_ctx;
}

function get_each_context_4(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[153] = list[i];
	return child_ctx;
}

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[145] = list[i];
	child_ctx[147] = i;
	return child_ctx;
}

function get_each_context_8(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[164] = list[i];
	child_ctx[147] = i;
	return child_ctx;
}

function get_each_context_12(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[166] = list[i];
	child_ctx[170] = list;
	child_ctx[147] = i;
	return child_ctx;
}

function get_each_context_11(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[166] = list[i];
	child_ctx[169] = list;
	child_ctx[147] = i;
	return child_ctx;
}

function get_each_context_10(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[166] = list[i];
	child_ctx[168] = list;
	child_ctx[147] = i;
	return child_ctx;
}

function get_each_context_9(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[166] = list[i];
	child_ctx[167] = list;
	child_ctx[147] = i;
	return child_ctx;
}

function get_each_context_13(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[164] = list[i];
	child_ctx[147] = i;
	return child_ctx;
}

// (389:20) {#each left_panel_tabs as tab, i}
function create_each_block_13(ctx) {
	let button;
	let t_value = /*tab*/ ctx[164] + "";
	let t;
	let mounted;
	let dispose;

	function click_handler() {
		return /*click_handler*/ ctx[49](/*i*/ ctx[147]);
	}

	const block = {
		c: function create() {
			button = element("button");
			t = text(t_value);
			attr_dev(button, "class", "tab svelte-qzsvuf");
			toggle_class(button, "active", /*i*/ ctx[147] === /*active_left_tab*/ ctx[17]);
			toggle_class(button, "right-bordered", /*i*/ ctx[147] < /*left_panel_tabs*/ ctx[35].length - 1);
			add_location(button, file$1, 389, 24, 12340);
		},
		m: function mount(target, anchor) {
			insert_dev(target, button, anchor);
			append_dev(button, t);

			if (!mounted) {
				dispose = listen_dev(button, "click", click_handler, false, false, false, false);
				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty[0] & /*active_left_tab*/ 131072) {
				toggle_class(button, "active", /*i*/ ctx[147] === /*active_left_tab*/ ctx[17]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(button);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_13.name,
		type: "each",
		source: "(389:20) {#each left_panel_tabs as tab, i}",
		ctx
	});

	return block;
}

// (658:46) 
function create_if_block_36(ctx) {
	let if_block_anchor;

	function select_block_type_11(ctx, dirty) {
		if (/*left_display_styles*/ ctx[5][/*active_left_tab*/ ctx[17]] === "grid") return create_if_block_37;
		return create_else_block_21;
	}

	let current_block_type = select_block_type_11(ctx);
	let if_block = current_block_type(ctx);

	const block = {
		c: function create() {
			if_block.c();
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (current_block_type === (current_block_type = select_block_type_11(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			}
		},
		d: function destroy(detaching) {
			if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_36.name,
		type: "if",
		source: "(658:46) ",
		ctx
	});

	return block;
}

// (415:16) {#if active_left_tab===0}
function create_if_block_21(ctx) {
	let if_block_anchor;

	function select_block_type_1(ctx, dirty) {
		if (/*left_display_styles*/ ctx[5][/*active_left_tab*/ ctx[17]] === "grid") return create_if_block_22;
		return create_else_block_11;
	}

	let current_block_type = select_block_type_1(ctx);
	let if_block = current_block_type(ctx);

	const block = {
		c: function create() {
			if_block.c();
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (current_block_type === (current_block_type = select_block_type_1(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			}
		},
		d: function destroy(detaching) {
			if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_21.name,
		type: "if",
		source: "(415:16) {#if active_left_tab===0}",
		ctx
	});

	return block;
}

// (750:20) {:else}
function create_else_block_21(ctx) {
	let div1;
	let div0;
	let span0;
	let strong0;
	let t1;
	let button0;
	let t2;
	let span1;
	let strong1;
	let t4;
	let button1;
	let t5;
	let span2;
	let strong2;
	let t7;
	let button2;
	let t8;
	let span3;
	let strong3;
	let t10;
	let mounted;
	let dispose;

	function select_block_type_15(ctx, dirty) {
		if (/*sortAscending*/ ctx[31] && /*sortKey*/ ctx[30] === 'id') return create_if_block_50;
		return create_else_block_27;
	}

	let current_block_type = select_block_type_15(ctx);
	let if_block0 = current_block_type(ctx);

	function select_block_type_16(ctx, dirty) {
		if (/*sortAscending*/ ctx[31] && /*sortKey*/ ctx[30] === 'quote') return create_if_block_49;
		return create_else_block_26;
	}

	let current_block_type_1 = select_block_type_16(ctx);
	let if_block1 = current_block_type_1(ctx);

	function select_block_type_17(ctx, dirty) {
		if (/*sortAscending*/ ctx[31] && /*sortKey*/ ctx[30] === 'speaker') return create_if_block_48;
		return create_else_block_25;
	}

	let current_block_type_2 = select_block_type_17(ctx);
	let if_block2 = current_block_type_2(ctx);
	let each_value_12 = /*feedback_list*/ ctx[0];
	validate_each_argument(each_value_12);
	let each_blocks = [];

	for (let i = 0; i < each_value_12.length; i += 1) {
		each_blocks[i] = create_each_block_12(get_each_context_12(ctx, each_value_12, i));
	}

	const block = {
		c: function create() {
			div1 = element("div");
			div0 = element("div");
			span0 = element("span");
			strong0 = element("strong");
			strong0.textContent = "ID";
			t1 = space();
			button0 = element("button");
			if_block0.c();
			t2 = space();
			span1 = element("span");
			strong1 = element("strong");
			strong1.textContent = "Feedback";
			t4 = space();
			button1 = element("button");
			if_block1.c();
			t5 = space();
			span2 = element("span");
			strong2 = element("strong");
			strong2.textContent = "Speaker";
			t7 = space();
			button2 = element("button");
			if_block2.c();
			t8 = space();
			span3 = element("span");
			strong3 = element("strong");
			strong3.textContent = "Actions";
			t10 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			add_location(strong0, file$1, 753, 36, 40557);
			attr_dev(button0, "class", "action-button");
			add_location(button0, file$1, 754, 36, 40613);
			attr_dev(span0, "class", "centered row id-col svelte-qzsvuf");
			set_style(span0, "gap", "0.4rem");
			add_location(span0, file$1, 752, 32, 40465);
			add_location(strong1, file$1, 763, 36, 41463);
			attr_dev(button1, "class", "action-button");
			add_location(button1, file$1, 764, 36, 41525);
			attr_dev(span1, "class", "centered row spaced feedback-col svelte-qzsvuf");
			add_location(span1, file$1, 762, 32, 41378);
			add_location(strong2, file$1, 773, 36, 42382);
			attr_dev(button2, "class", "action-button");
			add_location(button2, file$1, 774, 36, 42443);
			attr_dev(span2, "class", "centered row spaced speaker-col svelte-qzsvuf");
			add_location(span2, file$1, 772, 32, 42299);
			add_location(strong3, file$1, 783, 36, 43322);
			attr_dev(span3, "id", "feedback-buttons");
			attr_dev(span3, "class", "centered row actions-col svelte-qzsvuf");
			add_location(span3, file$1, 782, 32, 43223);
			attr_dev(div0, "class", "feedback-header row svelte-qzsvuf");
			add_location(div0, file$1, 751, 28, 40398);
			attr_dev(div1, "class", "column");
			set_style(div1, "overflow-y", "auto");
			add_location(div1, file$1, 750, 24, 40323);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div1, anchor);
			append_dev(div1, div0);
			append_dev(div0, span0);
			append_dev(span0, strong0);
			append_dev(span0, t1);
			append_dev(span0, button0);
			if_block0.m(button0, null);
			append_dev(div0, t2);
			append_dev(div0, span1);
			append_dev(span1, strong1);
			append_dev(span1, t4);
			append_dev(span1, button1);
			if_block1.m(button1, null);
			append_dev(div0, t5);
			append_dev(div0, span2);
			append_dev(span2, strong2);
			append_dev(span2, t7);
			append_dev(span2, button2);
			if_block2.m(button2, null);
			append_dev(div0, t8);
			append_dev(div0, span3);
			append_dev(span3, strong3);
			append_dev(div1, t10);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(div1, null);
				}
			}

			if (!mounted) {
				dispose = [
					listen_dev(button0, "click", /*click_handler_31*/ ctx[82], false, false, false, false),
					listen_dev(button1, "click", /*click_handler_32*/ ctx[83], false, false, false, false),
					listen_dev(button2, "click", /*click_handler_33*/ ctx[84], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (current_block_type !== (current_block_type = select_block_type_15(ctx))) {
				if_block0.d(1);
				if_block0 = current_block_type(ctx);

				if (if_block0) {
					if_block0.c();
					if_block0.m(button0, null);
				}
			}

			if (current_block_type_1 !== (current_block_type_1 = select_block_type_16(ctx))) {
				if_block1.d(1);
				if_block1 = current_block_type_1(ctx);

				if (if_block1) {
					if_block1.c();
					if_block1.m(button1, null);
				}
			}

			if (current_block_type_2 !== (current_block_type_2 = select_block_type_17(ctx))) {
				if_block2.d(1);
				if_block2 = current_block_type_2(ctx);

				if (if_block2) {
					if_block2.c();
					if_block2.m(button2, null);
				}
			}

			if (dirty[0] & /*feedback_list, selected_feedback, active_right_tab, feedback_notes, context, mediaPlayer*/ 362513 | dirty[1] & /*selectFeedback, removeFeedback, addContext*/ 2240) {
				each_value_12 = /*feedback_list*/ ctx[0];
				validate_each_argument(each_value_12);
				let i;

				for (i = 0; i < each_value_12.length; i += 1) {
					const child_ctx = get_each_context_12(ctx, each_value_12, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_12(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div1, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_12.length;
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div1);
			if_block0.d();
			if_block1.d();
			if_block2.d();
			destroy_each(each_blocks, detaching);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_21.name,
		type: "else",
		source: "(750:20) {:else}",
		ctx
	});

	return block;
}

// (659:20) {#if left_display_styles[active_left_tab] === "grid"}
function create_if_block_37(ctx) {
	let div;
	let each_value_11 = /*feedback_list*/ ctx[0];
	validate_each_argument(each_value_11);
	let each_blocks = [];

	for (let i = 0; i < each_value_11.length; i += 1) {
		each_blocks[i] = create_each_block_11(get_each_context_11(ctx, each_value_11, i));
	}

	const block = {
		c: function create() {
			div = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr_dev(div, "class", "grid svelte-qzsvuf");
			set_style(div, "overflow-y", "auto");
			add_location(div, file$1, 659, 24, 33346);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(div, null);
				}
			}
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*feedback_list, selected_feedback, active_right_tab, feedback_notes, context, mediaPlayer*/ 362513 | dirty[1] & /*selectFeedback, removeFeedback, addContext*/ 2240) {
				each_value_11 = /*feedback_list*/ ctx[0];
				validate_each_argument(each_value_11);
				let i;

				for (i = 0; i < each_value_11.length; i += 1) {
					const child_ctx = get_each_context_11(ctx, each_value_11, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_11(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_11.length;
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			destroy_each(each_blocks, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_37.name,
		type: "if",
		source: "(659:20) {#if left_display_styles[active_left_tab] === \\\"grid\\\"}",
		ctx
	});

	return block;
}

// (758:40) {:else}
function create_else_block_27(ctx) {
	let img;
	let img_src_value;

	const block = {
		c: function create() {
			img = element("img");
			set_style(img, "height", "1rem");
			set_style(img, "width", "1rem");
			if (!src_url_equal(img.src, img_src_value = "./logos/descending-sort-svgrepo-com.svg")) attr_dev(img, "src", img_src_value);
			attr_dev(img, "alt", "Sort descending");
			attr_dev(img, "class", "mini-icon");
			add_location(img, file$1, 758, 44, 41087);
		},
		m: function mount(target, anchor) {
			insert_dev(target, img, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(img);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_27.name,
		type: "else",
		source: "(758:40) {:else}",
		ctx
	});

	return block;
}

// (756:40) {#if sortAscending && sortKey==='id'}
function create_if_block_50(ctx) {
	let img;
	let img_src_value;

	const block = {
		c: function create() {
			img = element("img");
			set_style(img, "height", "1rem");
			set_style(img, "width", "1rem");
			if (!src_url_equal(img.src, img_src_value = "./logos/ascending-sort-svgrepo-com.svg")) attr_dev(img, "src", img_src_value);
			attr_dev(img, "alt", "Sort ascending");
			attr_dev(img, "class", "mini-icon");
			add_location(img, file$1, 756, 44, 40870);
		},
		m: function mount(target, anchor) {
			insert_dev(target, img, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(img);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_50.name,
		type: "if",
		source: "(756:40) {#if sortAscending && sortKey==='id'}",
		ctx
	});

	return block;
}

// (768:40) {:else}
function create_else_block_26(ctx) {
	let img;
	let img_src_value;

	const block = {
		c: function create() {
			img = element("img");
			set_style(img, "height", "1rem");
			set_style(img, "width", "1rem");
			if (!src_url_equal(img.src, img_src_value = "./logos/descending-sort-svgrepo-com.svg")) attr_dev(img, "src", img_src_value);
			attr_dev(img, "alt", "Sort descending");
			attr_dev(img, "class", "mini-icon");
			add_location(img, file$1, 768, 44, 42008);
		},
		m: function mount(target, anchor) {
			insert_dev(target, img, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(img);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_26.name,
		type: "else",
		source: "(768:40) {:else}",
		ctx
	});

	return block;
}

// (766:40) {#if sortAscending && sortKey==='quote'}
function create_if_block_49(ctx) {
	let img;
	let img_src_value;

	const block = {
		c: function create() {
			img = element("img");
			set_style(img, "height", "1rem");
			set_style(img, "width", "1rem");
			if (!src_url_equal(img.src, img_src_value = "./logos/ascending-sort-svgrepo-com.svg")) attr_dev(img, "src", img_src_value);
			attr_dev(img, "alt", "Sort ascending");
			attr_dev(img, "class", "mini-icon");
			add_location(img, file$1, 766, 44, 41791);
		},
		m: function mount(target, anchor) {
			insert_dev(target, img, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(img);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_49.name,
		type: "if",
		source: "(766:40) {#if sortAscending && sortKey==='quote'}",
		ctx
	});

	return block;
}

// (778:40) {:else}
function create_else_block_25(ctx) {
	let img;
	let img_src_value;

	const block = {
		c: function create() {
			img = element("img");
			set_style(img, "height", "1rem");
			set_style(img, "width", "1rem");
			if (!src_url_equal(img.src, img_src_value = "./logos/descending-sort-svgrepo-com.svg")) attr_dev(img, "src", img_src_value);
			attr_dev(img, "alt", "Sort descending");
			attr_dev(img, "class", "mini-icon");
			add_location(img, file$1, 778, 44, 42932);
		},
		m: function mount(target, anchor) {
			insert_dev(target, img, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(img);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_25.name,
		type: "else",
		source: "(778:40) {:else}",
		ctx
	});

	return block;
}

// (776:40) {#if sortAscending && sortKey==='speaker'}
function create_if_block_48(ctx) {
	let img;
	let img_src_value;

	const block = {
		c: function create() {
			img = element("img");
			set_style(img, "height", "1rem");
			set_style(img, "width", "1rem");
			if (!src_url_equal(img.src, img_src_value = "./logos/ascending-sort-svgrepo-com.svg")) attr_dev(img, "src", img_src_value);
			attr_dev(img, "alt", "Sort ascending");
			attr_dev(img, "class", "mini-icon");
			add_location(img, file$1, 776, 44, 42715);
		},
		m: function mount(target, anchor) {
			insert_dev(target, img, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(img);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_48.name,
		type: "if",
		source: "(776:40) {#if sortAscending && sortKey==='speaker'}",
		ctx
	});

	return block;
}

// (794:32) {#if feedback.type==="positive"}
function create_if_block_43(ctx) {
	let div2;
	let span0;
	let strong;
	let t0_value = /*feedback*/ ctx[166].id + "";
	let t0;
	let t1;
	let div0;
	let span2;
	let span1;
	let t2;
	let t3;
	let span3;

	let t4_value = (/*feedback*/ ctx[166].speaker
	? /*feedback*/ ctx[166].speaker
	: "Unknown") + "";

	let t4;
	let t5;
	let div1;
	let button0;
	let img0;
	let img0_src_value;
	let t6;
	let t7;
	let button1;
	let img1;
	let img1_src_value;
	let t8;
	let t9;
	let button2;
	let img2;
	let img2_src_value;
	let t10;
	let t11;
	let button3;
	let img3;
	let img3_src_value;
	let t12;
	let t13;
	let mounted;
	let dispose;

	function select_block_type_18(ctx, dirty) {
		if ("excerpt_reference" in /*feedback*/ ctx[166]) return create_if_block_46;
		return create_else_block_24;
	}

	let current_block_type = select_block_type_18(ctx);
	let if_block0 = current_block_type(ctx);

	function click_handler_34() {
		return /*click_handler_34*/ ctx[85](/*feedback*/ ctx[166]);
	}

	function select_block_type_20(ctx, dirty) {
		if (/*feedback*/ ctx[166].positivised_quote && /*feedback*/ ctx[166].show_paraphrased) return create_if_block_44;
		return create_else_block_22;
	}

	let current_block_type_1 = select_block_type_20(ctx);
	let if_block1 = current_block_type_1(ctx);

	function click_handler_37() {
		return /*click_handler_37*/ ctx[88](/*feedback*/ ctx[166], /*each_value_12*/ ctx[170], /*i*/ ctx[147]);
	}

	function click_handler_38() {
		return /*click_handler_38*/ ctx[89](/*feedback*/ ctx[166]);
	}

	function click_handler_39() {
		return /*click_handler_39*/ ctx[90](/*feedback*/ ctx[166]);
	}

	function click_handler_40() {
		return /*click_handler_40*/ ctx[91](/*feedback*/ ctx[166]);
	}

	function click_handler_41(...args) {
		return /*click_handler_41*/ ctx[92](/*feedback*/ ctx[166], ...args);
	}

	const block = {
		c: function create() {
			div2 = element("div");
			span0 = element("span");
			strong = element("strong");
			t0 = text(t0_value);
			t1 = space();
			div0 = element("div");
			span2 = element("span");
			span1 = element("span");
			if_block0.c();
			t2 = space();
			if_block1.c();
			t3 = space();
			span3 = element("span");
			t4 = text(t4_value);
			t5 = space();
			div1 = element("div");
			button0 = element("button");
			img0 = element("img");
			t6 = text("\n                                                Positivize");
			t7 = space();
			button1 = element("button");
			img1 = element("img");
			t8 = text("\n                                                Select Context");
			t9 = space();
			button2 = element("button");
			img2 = element("img");
			t10 = text("\n                                                Add Note");
			t11 = space();
			button3 = element("button");
			img3 = element("img");
			t12 = text("\n                                                Delete");
			t13 = space();
			add_location(strong, file$1, 802, 44, 44930);
			attr_dev(span0, "class", "id-col svelte-qzsvuf");
			add_location(span0, file$1, 801, 40, 44864);
			attr_dev(span1, "class", "timestamp svelte-qzsvuf");
			add_location(span1, file$1, 806, 48, 45195);
			attr_dev(span2, "class", "");
			add_location(span2, file$1, 805, 44, 45130);
			attr_dev(div0, "class", "column feedback-col svelte-qzsvuf");
			add_location(div0, file$1, 804, 40, 45051);
			attr_dev(span3, "class", "centered speaker-col svelte-qzsvuf");
			add_location(span3, file$1, 838, 40, 48084);
			if (!src_url_equal(img0.src, img0_src_value = "./logos/ai-positive-paraphrase.png")) attr_dev(img0, "src", img0_src_value);
			attr_dev(img0, "alt", "Paraphrase positively");
			attr_dev(img0, "class", "action-icon");
			add_location(img0, file$1, 848, 48, 48999);
			attr_dev(button0, "class", "action-button");
			add_location(button0, file$1, 842, 44, 48416);
			if (!src_url_equal(img1.src, img1_src_value = "./logos/select-context.svg")) attr_dev(img1, "src", img1_src_value);
			attr_dev(img1, "alt", "Select feedback as context");
			set_style(img1, "height", "3.3rem");
			set_style(img1, "width", "3.3rem");
			add_location(img1, file$1, 857, 48, 49665);
			attr_dev(button1, "class", "action-button centered column");
			add_location(button1, file$1, 852, 44, 49252);
			if (!src_url_equal(img2.src, img2_src_value = "./logos/note-svgrepo-com.svg")) attr_dev(img2, "src", img2_src_value);
			attr_dev(img2, "alt", "Remove feedback");
			attr_dev(img2, "class", "action-icon");
			add_location(img2, file$1, 868, 48, 50556);
			attr_dev(button2, "class", "action-button");
			add_location(button2, file$1, 860, 44, 49937);
			if (!src_url_equal(img3.src, img3_src_value = "./logos/delete-svgrepo-com.svg")) attr_dev(img3, "src", img3_src_value);
			attr_dev(img3, "alt", "Remove feedback");
			attr_dev(img3, "class", "action-icon");
			add_location(img3, file$1, 881, 48, 51595);
			attr_dev(button3, "class", "action-button");
			add_location(button3, file$1, 871, 44, 50794);
			attr_dev(div1, "id", "feedback-buttons");
			attr_dev(div1, "class", "row centered spaced actions-col svelte-qzsvuf");
			add_location(div1, file$1, 841, 40, 48303);
			attr_dev(div2, "class", "feedback-row row bordered padded svelte-qzsvuf");
			toggle_class(div2, "done", /*feedback*/ ctx[166].done);
			toggle_class(div2, "selected", /*feedback*/ ctx[166] === /*selected_feedback*/ ctx[15]);
			add_location(div2, file$1, 794, 36, 44300);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div2, anchor);
			append_dev(div2, span0);
			append_dev(span0, strong);
			append_dev(strong, t0);
			append_dev(div2, t1);
			append_dev(div2, div0);
			append_dev(div0, span2);
			append_dev(span2, span1);
			if_block0.m(span1, null);
			append_dev(span2, t2);
			if_block1.m(span2, null);
			append_dev(div2, t3);
			append_dev(div2, span3);
			append_dev(span3, t4);
			append_dev(div2, t5);
			append_dev(div2, div1);
			append_dev(div1, button0);
			append_dev(button0, img0);
			append_dev(button0, t6);
			append_dev(div1, t7);
			append_dev(div1, button1);
			append_dev(button1, img1);
			append_dev(button1, t8);
			append_dev(div1, t9);
			append_dev(div1, button2);
			append_dev(button2, img2);
			append_dev(button2, t10);
			append_dev(div1, t11);
			append_dev(div1, button3);
			append_dev(button3, img3);
			append_dev(button3, t12);
			append_dev(div2, t13);

			if (!mounted) {
				dispose = [
					listen_dev(span1, "click", click_handler_34, false, false, false, false),
					listen_dev(button0, "click", click_handler_37, false, false, false, false),
					listen_dev(button1, "click", click_handler_38, false, false, false, false),
					listen_dev(button2, "click", click_handler_39, false, false, false, false),
					listen_dev(button3, "click", click_handler_40, false, false, false, false),
					listen_dev(div2, "click", click_handler_41, false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty[0] & /*feedback_list*/ 1 && t0_value !== (t0_value = /*feedback*/ ctx[166].id + "")) set_data_dev(t0, t0_value);

			if (current_block_type === (current_block_type = select_block_type_18(ctx)) && if_block0) {
				if_block0.p(ctx, dirty);
			} else {
				if_block0.d(1);
				if_block0 = current_block_type(ctx);

				if (if_block0) {
					if_block0.c();
					if_block0.m(span1, null);
				}
			}

			if (current_block_type_1 === (current_block_type_1 = select_block_type_20(ctx)) && if_block1) {
				if_block1.p(ctx, dirty);
			} else {
				if_block1.d(1);
				if_block1 = current_block_type_1(ctx);

				if (if_block1) {
					if_block1.c();
					if_block1.m(span2, null);
				}
			}

			if (dirty[0] & /*feedback_list*/ 1 && t4_value !== (t4_value = (/*feedback*/ ctx[166].speaker
			? /*feedback*/ ctx[166].speaker
			: "Unknown") + "")) set_data_dev(t4, t4_value);

			if (dirty[0] & /*feedback_list*/ 1) {
				toggle_class(div2, "done", /*feedback*/ ctx[166].done);
			}

			if (dirty[0] & /*feedback_list, selected_feedback*/ 32769) {
				toggle_class(div2, "selected", /*feedback*/ ctx[166] === /*selected_feedback*/ ctx[15]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div2);
			if_block0.d();
			if_block1.d();
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_43.name,
		type: "if",
		source: "(794:32) {#if feedback.type===\\\"positive\\\"}",
		ctx
	});

	return block;
}

// (823:52) {:else}
function create_else_block_24(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("[00:00:00]");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		p: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_24.name,
		type: "else",
		source: "(823:52) {:else}",
		ctx
	});

	return block;
}

// (817:52) {#if "excerpt_reference" in feedback}
function create_if_block_46(ctx) {
	let if_block_anchor;

	function select_block_type_19(ctx, dirty) {
		if ("start_timestamp" in /*feedback*/ ctx[166].excerpt_reference) return create_if_block_47;
		return create_else_block_23;
	}

	let current_block_type = select_block_type_19(ctx);
	let if_block = current_block_type(ctx);

	const block = {
		c: function create() {
			if_block.c();
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (current_block_type === (current_block_type = select_block_type_19(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			}
		},
		d: function destroy(detaching) {
			if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_46.name,
		type: "if",
		source: "(817:52) {#if \\\"excerpt_reference\\\" in feedback}",
		ctx
	});

	return block;
}

// (820:56) {:else}
function create_else_block_23(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("[00:00:00]");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		p: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_23.name,
		type: "else",
		source: "(820:56) {:else}",
		ctx
	});

	return block;
}

// (818:56) {#if "start_timestamp" in feedback.excerpt_reference}
function create_if_block_47(ctx) {
	let t0;
	let t1_value = /*feedback*/ ctx[166].excerpt_reference.start_timestamp + "";
	let t1;
	let t2;

	const block = {
		c: function create() {
			t0 = text("[");
			t1 = text(t1_value);
			t2 = text("]");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t0, anchor);
			insert_dev(target, t1, anchor);
			insert_dev(target, t2, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*feedback_list*/ 1 && t1_value !== (t1_value = /*feedback*/ ctx[166].excerpt_reference.start_timestamp + "")) set_data_dev(t1, t1_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(t1);
			if (detaching) detach_dev(t2);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_47.name,
		type: "if",
		source: "(818:56) {#if \\\"start_timestamp\\\" in feedback.excerpt_reference}",
		ctx
	});

	return block;
}

// (832:48) {:else}
function create_else_block_22(ctx) {
	let t0;
	let t1_value = /*feedback*/ ctx[166].quote + "";
	let t1;
	let t2;
	let if_block_anchor;
	let if_block = /*feedback*/ ctx[166].positivised_quote && !/*feedback*/ ctx[166].show_paraphrased && create_if_block_45(ctx);

	const block = {
		c: function create() {
			t0 = text("\"");
			t1 = text(t1_value);
			t2 = text("\" ");
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			insert_dev(target, t0, anchor);
			insert_dev(target, t1, anchor);
			insert_dev(target, t2, anchor);
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*feedback_list*/ 1 && t1_value !== (t1_value = /*feedback*/ ctx[166].quote + "")) set_data_dev(t1, t1_value);

			if (/*feedback*/ ctx[166].positivised_quote && !/*feedback*/ ctx[166].show_paraphrased) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_45(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(t1);
			if (detaching) detach_dev(t2);
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_22.name,
		type: "else",
		source: "(832:48) {:else}",
		ctx
	});

	return block;
}

// (827:48) {#if feedback.positivised_quote && feedback.show_paraphrased}
function create_if_block_44(ctx) {
	let strong;
	let t1;
	let t2_value = /*feedback*/ ctx[166].positivised_quote + "";
	let t2;
	let t3;
	let span;
	let mounted;
	let dispose;

	function click_handler_35() {
		return /*click_handler_35*/ ctx[86](/*feedback*/ ctx[166]);
	}

	const block = {
		c: function create() {
			strong = element("strong");
			strong.textContent = "(Paraphrased Feedback)";
			t1 = text(" \"");
			t2 = text(t2_value);
			t3 = text("\" \n                                                    ");
			span = element("span");
			span.textContent = "(View original quote)";
			add_location(strong, file$1, 827, 52, 46960);
			attr_dev(span, "class", "clickable svelte-qzsvuf");
			add_location(span, file$1, 828, 52, 47084);
		},
		m: function mount(target, anchor) {
			insert_dev(target, strong, anchor);
			insert_dev(target, t1, anchor);
			insert_dev(target, t2, anchor);
			insert_dev(target, t3, anchor);
			insert_dev(target, span, anchor);

			if (!mounted) {
				dispose = listen_dev(span, "click", click_handler_35, false, false, false, false);
				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty[0] & /*feedback_list*/ 1 && t2_value !== (t2_value = /*feedback*/ ctx[166].positivised_quote + "")) set_data_dev(t2, t2_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(strong);
			if (detaching) detach_dev(t1);
			if (detaching) detach_dev(t2);
			if (detaching) detach_dev(t3);
			if (detaching) detach_dev(span);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_44.name,
		type: "if",
		source: "(827:48) {#if feedback.positivised_quote && feedback.show_paraphrased}",
		ctx
	});

	return block;
}

// (833:71) {#if feedback.positivised_quote && !feedback.show_paraphrased }
function create_if_block_45(ctx) {
	let span;
	let mounted;
	let dispose;

	function click_handler_36() {
		return /*click_handler_36*/ ctx[87](/*feedback*/ ctx[166]);
	}

	const block = {
		c: function create() {
			span = element("span");
			span.textContent = "(View paraphrased quote)";
			attr_dev(span, "class", "clickable svelte-qzsvuf");
			add_location(span, file$1, 833, 52, 47629);
		},
		m: function mount(target, anchor) {
			insert_dev(target, span, anchor);

			if (!mounted) {
				dispose = listen_dev(span, "click", click_handler_36, false, false, false, false);
				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(span);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_45.name,
		type: "if",
		source: "(833:71) {#if feedback.positivised_quote && !feedback.show_paraphrased }",
		ctx
	});

	return block;
}

// (793:28) {#each feedback_list as feedback, i}
function create_each_block_12(ctx) {
	let if_block_anchor;
	let if_block = /*feedback*/ ctx[166].type === "positive" && create_if_block_43(ctx);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (/*feedback*/ ctx[166].type === "positive") {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_43(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		d: function destroy(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_12.name,
		type: "each",
		source: "(793:28) {#each feedback_list as feedback, i}",
		ctx
	});

	return block;
}

// (662:32) {#if feedback.type==="positive"}
function create_if_block_38(ctx) {
	let div2;
	let div1;
	let small;
	let t0;
	let div0;
	let button0;
	let img0;
	let img0_src_value;
	let t1;
	let button1;
	let img1;
	let img1_src_value;
	let t2;
	let button2;
	let img2;
	let img2_src_value;
	let t3;
	let button3;
	let img3;
	let img3_src_value;
	let t4;
	let br0;
	let t5;
	let strong;
	let t6;
	let t7_value = /*feedback*/ ctx[166].id + "";
	let t7;
	let t8;
	let t9;
	let t10;
	let br1;
	let t11;
	let span;
	let t12;
	let t13_value = /*feedback*/ ctx[166].speaker + "";
	let t13;
	let t14;
	let mounted;
	let dispose;

	function select_block_type_12(ctx, dirty) {
		if ("excerpt_reference" in /*feedback*/ ctx[166]) return create_if_block_41;
		return create_else_block_20;
	}

	let current_block_type = select_block_type_12(ctx);
	let if_block0 = current_block_type(ctx);

	function click_handler_23() {
		return /*click_handler_23*/ ctx[74](/*feedback*/ ctx[166]);
	}

	function click_handler_24() {
		return /*click_handler_24*/ ctx[75](/*feedback*/ ctx[166], /*each_value_11*/ ctx[169], /*i*/ ctx[147]);
	}

	function click_handler_25() {
		return /*click_handler_25*/ ctx[76](/*feedback*/ ctx[166]);
	}

	function click_handler_26() {
		return /*click_handler_26*/ ctx[77](/*feedback*/ ctx[166]);
	}

	function click_handler_27() {
		return /*click_handler_27*/ ctx[78](/*feedback*/ ctx[166]);
	}

	function select_block_type_14(ctx, dirty) {
		if (/*feedback*/ ctx[166].positivised_quote && /*feedback*/ ctx[166].show_paraphrased) return create_if_block_39;
		return create_else_block_18;
	}

	let current_block_type_1 = select_block_type_14(ctx);
	let if_block1 = current_block_type_1(ctx);

	function click_handler_30(...args) {
		return /*click_handler_30*/ ctx[81](/*feedback*/ ctx[166], ...args);
	}

	const block = {
		c: function create() {
			div2 = element("div");
			div1 = element("div");
			small = element("small");
			if_block0.c();
			t0 = space();
			div0 = element("div");
			button0 = element("button");
			img0 = element("img");
			t1 = space();
			button1 = element("button");
			img1 = element("img");
			t2 = space();
			button2 = element("button");
			img2 = element("img");
			t3 = space();
			button3 = element("button");
			img3 = element("img");
			t4 = space();
			br0 = element("br");
			t5 = space();
			strong = element("strong");
			t6 = text("F#");
			t7 = text(t7_value);
			t8 = text(":");
			t9 = space();
			if_block1.c();
			t10 = space();
			br1 = element("br");
			t11 = space();
			span = element("span");
			t12 = text("- ");
			t13 = text(t13_value);
			t14 = space();
			attr_dev(small, "class", "timestamp svelte-qzsvuf");
			add_location(small, file$1, 669, 44, 34132);
			if (!src_url_equal(img0.src, img0_src_value = "./logos/ai-positive-paraphrase.png")) attr_dev(img0, "src", img0_src_value);
			attr_dev(img0, "alt", "Paraphrase positively");
			attr_dev(img0, "class", "mini-icon");
			add_location(img0, file$1, 698, 52, 36386);
			attr_dev(button0, "class", "action-button");
			add_location(button0, file$1, 692, 48, 35779);
			if (!src_url_equal(img1.src, img1_src_value = "./logos/select-context.svg")) attr_dev(img1, "src", img1_src_value);
			attr_dev(img1, "alt", "Select feedback as context");
			set_style(img1, "height", "2.3rem");
			set_style(img1, "width", "2.3rem");
			add_location(img1, file$1, 706, 52, 37008);
			attr_dev(button1, "class", "action-button");
			add_location(button1, file$1, 701, 48, 36587);
			if (!src_url_equal(img2.src, img2_src_value = "./logos/note-svgrepo-com.svg")) attr_dev(img2, "src", img2_src_value);
			attr_dev(img2, "alt", "Add note");
			attr_dev(img2, "class", "mini-icon");
			add_location(img2, file$1, 717, 52, 37879);
			attr_dev(button2, "class", "action-button");
			add_location(button2, file$1, 709, 48, 37226);
			if (!src_url_equal(img3.src, img3_src_value = "./logos/delete-svgrepo-com.svg")) attr_dev(img3, "src", img3_src_value);
			attr_dev(img3, "alt", "Paraphrase positively");
			set_style(img3, "height", "2rem");
			set_style(img3, "width", "2rem");
			add_location(img3, file$1, 725, 52, 38511);
			attr_dev(button3, "class", "action-button");
			add_location(button3, file$1, 720, 48, 38061);
			attr_dev(div0, "class", "row spaced");
			add_location(div0, file$1, 690, 44, 35705);
			attr_dev(div1, "class", "note-header row space-between");
			add_location(div1, file$1, 668, 40, 34044);
			add_location(br0, file$1, 731, 40, 38855);
			add_location(strong, file$1, 732, 40, 38900);
			add_location(br1, file$1, 743, 40, 40042);
			add_location(span, file$1, 744, 40, 40087);
			attr_dev(div2, "class", "positive-feedback-note svelte-qzsvuf");
			toggle_class(div2, "selected", /*feedback*/ ctx[166] === /*selected_feedback*/ ctx[15]);
			add_location(div2, file$1, 662, 36, 33557);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div2, anchor);
			append_dev(div2, div1);
			append_dev(div1, small);
			if_block0.m(small, null);
			append_dev(div1, t0);
			append_dev(div1, div0);
			append_dev(div0, button0);
			append_dev(button0, img0);
			append_dev(div0, t1);
			append_dev(div0, button1);
			append_dev(button1, img1);
			append_dev(div0, t2);
			append_dev(div0, button2);
			append_dev(button2, img2);
			append_dev(div0, t3);
			append_dev(div0, button3);
			append_dev(button3, img3);
			append_dev(div2, t4);
			append_dev(div2, br0);
			append_dev(div2, t5);
			append_dev(div2, strong);
			append_dev(strong, t6);
			append_dev(strong, t7);
			append_dev(strong, t8);
			append_dev(div2, t9);
			if_block1.m(div2, null);
			append_dev(div2, t10);
			append_dev(div2, br1);
			append_dev(div2, t11);
			append_dev(div2, span);
			append_dev(span, t12);
			append_dev(span, t13);
			append_dev(div2, t14);

			if (!mounted) {
				dispose = [
					listen_dev(small, "click", click_handler_23, false, false, false, false),
					listen_dev(button0, "click", click_handler_24, false, false, false, false),
					listen_dev(button1, "click", click_handler_25, false, false, false, false),
					listen_dev(button2, "click", click_handler_26, false, false, false, false),
					listen_dev(button3, "click", click_handler_27, false, false, false, false),
					listen_dev(div2, "click", click_handler_30, false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;

			if (current_block_type === (current_block_type = select_block_type_12(ctx)) && if_block0) {
				if_block0.p(ctx, dirty);
			} else {
				if_block0.d(1);
				if_block0 = current_block_type(ctx);

				if (if_block0) {
					if_block0.c();
					if_block0.m(small, null);
				}
			}

			if (dirty[0] & /*feedback_list*/ 1 && t7_value !== (t7_value = /*feedback*/ ctx[166].id + "")) set_data_dev(t7, t7_value);

			if (current_block_type_1 === (current_block_type_1 = select_block_type_14(ctx)) && if_block1) {
				if_block1.p(ctx, dirty);
			} else {
				if_block1.d(1);
				if_block1 = current_block_type_1(ctx);

				if (if_block1) {
					if_block1.c();
					if_block1.m(div2, t10);
				}
			}

			if (dirty[0] & /*feedback_list*/ 1 && t13_value !== (t13_value = /*feedback*/ ctx[166].speaker + "")) set_data_dev(t13, t13_value);

			if (dirty[0] & /*feedback_list, selected_feedback*/ 32769) {
				toggle_class(div2, "selected", /*feedback*/ ctx[166] === /*selected_feedback*/ ctx[15]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div2);
			if_block0.d();
			if_block1.d();
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_38.name,
		type: "if",
		source: "(662:32) {#if feedback.type===\\\"positive\\\"}",
		ctx
	});

	return block;
}

// (686:48) {:else}
function create_else_block_20(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("[00:00:00]");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		p: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_20.name,
		type: "else",
		source: "(686:48) {:else}",
		ctx
	});

	return block;
}

// (680:48) {#if "excerpt_reference" in feedback}
function create_if_block_41(ctx) {
	let if_block_anchor;

	function select_block_type_13(ctx, dirty) {
		if ("start_timestamp" in /*feedback*/ ctx[166].excerpt_reference) return create_if_block_42;
		return create_else_block_19;
	}

	let current_block_type = select_block_type_13(ctx);
	let if_block = current_block_type(ctx);

	const block = {
		c: function create() {
			if_block.c();
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (current_block_type === (current_block_type = select_block_type_13(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			}
		},
		d: function destroy(detaching) {
			if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_41.name,
		type: "if",
		source: "(680:48) {#if \\\"excerpt_reference\\\" in feedback}",
		ctx
	});

	return block;
}

// (683:52) {:else}
function create_else_block_19(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("[00:00:00]");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		p: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_19.name,
		type: "else",
		source: "(683:52) {:else}",
		ctx
	});

	return block;
}

// (681:52) {#if "start_timestamp" in feedback.excerpt_reference}
function create_if_block_42(ctx) {
	let t0;
	let t1_value = /*feedback*/ ctx[166].excerpt_reference.start_timestamp + "";
	let t1;
	let t2;

	const block = {
		c: function create() {
			t0 = text("[");
			t1 = text(t1_value);
			t2 = text("]");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t0, anchor);
			insert_dev(target, t1, anchor);
			insert_dev(target, t2, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*feedback_list*/ 1 && t1_value !== (t1_value = /*feedback*/ ctx[166].excerpt_reference.start_timestamp + "")) set_data_dev(t1, t1_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(t1);
			if (detaching) detach_dev(t2);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_42.name,
		type: "if",
		source: "(681:52) {#if \\\"start_timestamp\\\" in feedback.excerpt_reference}",
		ctx
	});

	return block;
}

// (739:40) {:else}
function create_else_block_18(ctx) {
	let t0;
	let t1_value = /*feedback*/ ctx[166].quote + "";
	let t1;
	let t2;
	let if_block_anchor;
	let if_block = /*feedback*/ ctx[166].positivised_quote && !/*feedback*/ ctx[166].show_paraphrased && create_if_block_40(ctx);

	const block = {
		c: function create() {
			t0 = text("\"");
			t1 = text(t1_value);
			t2 = text("\" ");
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			insert_dev(target, t0, anchor);
			insert_dev(target, t1, anchor);
			insert_dev(target, t2, anchor);
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*feedback_list*/ 1 && t1_value !== (t1_value = /*feedback*/ ctx[166].quote + "")) set_data_dev(t1, t1_value);

			if (/*feedback*/ ctx[166].positivised_quote && !/*feedback*/ ctx[166].show_paraphrased) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_40(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(t1);
			if (detaching) detach_dev(t2);
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_18.name,
		type: "else",
		source: "(739:40) {:else}",
		ctx
	});

	return block;
}

// (734:40) {#if feedback.positivised_quote && feedback.show_paraphrased}
function create_if_block_39(ctx) {
	let strong;
	let t1;
	let t2_value = /*feedback*/ ctx[166].positivised_quote + "";
	let t2;
	let t3;
	let span;
	let mounted;
	let dispose;

	function click_handler_28() {
		return /*click_handler_28*/ ctx[79](/*feedback*/ ctx[166]);
	}

	const block = {
		c: function create() {
			strong = element("strong");
			strong.textContent = "(Paraphrased Feedback)";
			t1 = text(" \"");
			t2 = text(t2_value);
			t3 = text("\" \n                                            ");
			span = element("span");
			span.textContent = "(View original quote)";
			add_location(strong, file$1, 734, 44, 39081);
			attr_dev(span, "class", "clickable svelte-qzsvuf");
			add_location(span, file$1, 735, 44, 39197);
		},
		m: function mount(target, anchor) {
			insert_dev(target, strong, anchor);
			insert_dev(target, t1, anchor);
			insert_dev(target, t2, anchor);
			insert_dev(target, t3, anchor);
			insert_dev(target, span, anchor);

			if (!mounted) {
				dispose = listen_dev(span, "click", click_handler_28, false, false, false, false);
				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty[0] & /*feedback_list*/ 1 && t2_value !== (t2_value = /*feedback*/ ctx[166].positivised_quote + "")) set_data_dev(t2, t2_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(strong);
			if (detaching) detach_dev(t1);
			if (detaching) detach_dev(t2);
			if (detaching) detach_dev(t3);
			if (detaching) detach_dev(span);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_39.name,
		type: "if",
		source: "(734:40) {#if feedback.positivised_quote && feedback.show_paraphrased}",
		ctx
	});

	return block;
}

// (740:63) {#if feedback.positivised_quote && !feedback.show_paraphrased }
function create_if_block_40(ctx) {
	let span;
	let mounted;
	let dispose;

	function click_handler_29() {
		return /*click_handler_29*/ ctx[80](/*feedback*/ ctx[166]);
	}

	const block = {
		c: function create() {
			span = element("span");
			span.textContent = "(View paraphrased quote)";
			attr_dev(span, "class", "clickable svelte-qzsvuf");
			add_location(span, file$1, 740, 44, 39702);
		},
		m: function mount(target, anchor) {
			insert_dev(target, span, anchor);

			if (!mounted) {
				dispose = listen_dev(span, "click", click_handler_29, false, false, false, false);
				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(span);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_40.name,
		type: "if",
		source: "(740:63) {#if feedback.positivised_quote && !feedback.show_paraphrased }",
		ctx
	});

	return block;
}

// (661:28) {#each feedback_list as feedback, i}
function create_each_block_11(ctx) {
	let if_block_anchor;
	let if_block = /*feedback*/ ctx[166].type === "positive" && create_if_block_38(ctx);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (/*feedback*/ ctx[166].type === "positive") {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_38(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		d: function destroy(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_11.name,
		type: "each",
		source: "(661:28) {#each feedback_list as feedback, i}",
		ctx
	});

	return block;
}

// (512:20) {:else}
function create_else_block_11(ctx) {
	let div1;
	let div0;
	let span0;
	let strong0;
	let t1;
	let button0;
	let t2;
	let span1;
	let strong1;
	let t4;
	let button1;
	let t5;
	let span2;
	let strong2;
	let t7;
	let button2;
	let t8;
	let span3;
	let strong3;
	let t10;
	let span4;
	let strong4;
	let t12;
	let button3;
	let img;
	let img_src_value;
	let img_alt_value;
	let t13;
	let mounted;
	let dispose;

	function select_block_type_5(ctx, dirty) {
		if (/*sortAscending*/ ctx[31] && /*sortKey*/ ctx[30] === 'id') return create_if_block_35;
		return create_else_block_17;
	}

	let current_block_type = select_block_type_5(ctx);
	let if_block0 = current_block_type(ctx);

	function select_block_type_6(ctx, dirty) {
		if (/*sortAscending*/ ctx[31] && /*sortKey*/ ctx[30] === 'quote') return create_if_block_34;
		return create_else_block_16;
	}

	let current_block_type_1 = select_block_type_6(ctx);
	let if_block1 = current_block_type_1(ctx);

	function select_block_type_7(ctx, dirty) {
		if (/*sortAscending*/ ctx[31] && /*sortKey*/ ctx[30] === 'speaker') return create_if_block_33;
		return create_else_block_15;
	}

	let current_block_type_2 = select_block_type_7(ctx);
	let if_block2 = current_block_type_2(ctx);
	let each_value_10 = /*feedback_list*/ ctx[0];
	validate_each_argument(each_value_10);
	let each_blocks = [];

	for (let i = 0; i < each_value_10.length; i += 1) {
		each_blocks[i] = create_each_block_10(get_each_context_10(ctx, each_value_10, i));
	}

	const block = {
		c: function create() {
			div1 = element("div");
			div0 = element("div");
			span0 = element("span");
			strong0 = element("strong");
			strong0.textContent = "ID";
			t1 = space();
			button0 = element("button");
			if_block0.c();
			t2 = space();
			span1 = element("span");
			strong1 = element("strong");
			strong1.textContent = "Feedback";
			t4 = space();
			button1 = element("button");
			if_block1.c();
			t5 = space();
			span2 = element("span");
			strong2 = element("strong");
			strong2.textContent = "Speaker";
			t7 = space();
			button2 = element("button");
			if_block2.c();
			t8 = space();
			span3 = element("span");
			strong3 = element("strong");
			strong3.textContent = "Actions";
			t10 = space();
			span4 = element("span");
			strong4 = element("strong");
			strong4.textContent = "Done?";
			t12 = space();
			button3 = element("button");
			img = element("img");
			t13 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			add_location(strong0, file$1, 515, 36, 21490);
			attr_dev(button0, "class", "action-button");
			add_location(button0, file$1, 516, 36, 21546);
			attr_dev(span0, "class", "centered row id-col svelte-qzsvuf");
			set_style(span0, "gap", "0.4rem");
			add_location(span0, file$1, 514, 32, 21398);
			add_location(strong1, file$1, 525, 36, 22396);
			attr_dev(button1, "class", "action-button");
			add_location(button1, file$1, 526, 36, 22458);
			attr_dev(span1, "class", "centered row spaced feedback-col svelte-qzsvuf");
			add_location(span1, file$1, 524, 32, 22311);
			add_location(strong2, file$1, 535, 36, 23315);
			attr_dev(button2, "class", "action-button");
			add_location(button2, file$1, 536, 36, 23376);
			attr_dev(span2, "class", "centered row spaced speaker-col svelte-qzsvuf");
			add_location(span2, file$1, 534, 32, 23232);
			add_location(strong3, file$1, 545, 36, 24255);
			attr_dev(span3, "id", "feedback-buttons");
			attr_dev(span3, "class", "centered row actions-col svelte-qzsvuf");
			add_location(span3, file$1, 544, 32, 24156);
			add_location(strong4, file$1, 548, 36, 24433);
			set_style(img, "height", "1rem");
			set_style(img, "width", "1rem");

			if (!src_url_equal(img.src, img_src_value = /*sortAscending*/ ctx[31] && /*sortKey*/ ctx[30] === 'done'
			? "./logos/ascending-sort-svgrepo-com.svg"
			: "./logos/descending-sort-svgrepo-com.svg")) attr_dev(img, "src", img_src_value);

			attr_dev(img, "alt", img_alt_value = /*sortAscending*/ ctx[31] && /*sortKey*/ ctx[30] === 'done'
			? "Sort ascending"
			: "Sort descending");

			attr_dev(img, "class", "mini-icon");
			add_location(img, file$1, 550, 40, 24671);
			attr_dev(button3, "class", "action-button");
			add_location(button3, file$1, 549, 36, 24492);
			attr_dev(span4, "class", "centered row spaced done-col svelte-qzsvuf");
			add_location(span4, file$1, 547, 32, 24352);
			attr_dev(div0, "class", "feedback-header row svelte-qzsvuf");
			add_location(div0, file$1, 513, 28, 21331);
			attr_dev(div1, "class", "column");
			set_style(div1, "overflow-y", "auto");
			add_location(div1, file$1, 512, 24, 21256);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div1, anchor);
			append_dev(div1, div0);
			append_dev(div0, span0);
			append_dev(span0, strong0);
			append_dev(span0, t1);
			append_dev(span0, button0);
			if_block0.m(button0, null);
			append_dev(div0, t2);
			append_dev(div0, span1);
			append_dev(span1, strong1);
			append_dev(span1, t4);
			append_dev(span1, button1);
			if_block1.m(button1, null);
			append_dev(div0, t5);
			append_dev(div0, span2);
			append_dev(span2, strong2);
			append_dev(span2, t7);
			append_dev(span2, button2);
			if_block2.m(button2, null);
			append_dev(div0, t8);
			append_dev(div0, span3);
			append_dev(span3, strong3);
			append_dev(div0, t10);
			append_dev(div0, span4);
			append_dev(span4, strong4);
			append_dev(span4, t12);
			append_dev(span4, button3);
			append_dev(button3, img);
			append_dev(div1, t13);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(div1, null);
				}
			}

			if (!mounted) {
				dispose = [
					listen_dev(button0, "click", /*click_handler_11*/ ctx[61], false, false, false, false),
					listen_dev(button1, "click", /*click_handler_12*/ ctx[62], false, false, false, false),
					listen_dev(button2, "click", /*click_handler_13*/ ctx[63], false, false, false, false),
					listen_dev(button3, "click", /*click_handler_14*/ ctx[64], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (current_block_type !== (current_block_type = select_block_type_5(ctx))) {
				if_block0.d(1);
				if_block0 = current_block_type(ctx);

				if (if_block0) {
					if_block0.c();
					if_block0.m(button0, null);
				}
			}

			if (current_block_type_1 !== (current_block_type_1 = select_block_type_6(ctx))) {
				if_block1.d(1);
				if_block1 = current_block_type_1(ctx);

				if (if_block1) {
					if_block1.c();
					if_block1.m(button1, null);
				}
			}

			if (current_block_type_2 !== (current_block_type_2 = select_block_type_7(ctx))) {
				if_block2.d(1);
				if_block2 = current_block_type_2(ctx);

				if (if_block2) {
					if_block2.c();
					if_block2.m(button2, null);
				}
			}

			if (dirty[0] & /*sortKey*/ 1073741824 | dirty[1] & /*sortAscending*/ 1 && !src_url_equal(img.src, img_src_value = /*sortAscending*/ ctx[31] && /*sortKey*/ ctx[30] === 'done'
			? "./logos/ascending-sort-svgrepo-com.svg"
			: "./logos/descending-sort-svgrepo-com.svg")) {
				attr_dev(img, "src", img_src_value);
			}

			if (dirty[0] & /*sortKey*/ 1073741824 | dirty[1] & /*sortAscending*/ 1 && img_alt_value !== (img_alt_value = /*sortAscending*/ ctx[31] && /*sortKey*/ ctx[30] === 'done'
			? "Sort ascending"
			: "Sort descending")) {
				attr_dev(img, "alt", img_alt_value);
			}

			if (dirty[0] & /*feedback_list, selected_feedback, active_right_tab, feedback_notes, context, mediaPlayer*/ 362513 | dirty[1] & /*selectFeedback, removeFeedback, addContext*/ 2240) {
				each_value_10 = /*feedback_list*/ ctx[0];
				validate_each_argument(each_value_10);
				let i;

				for (i = 0; i < each_value_10.length; i += 1) {
					const child_ctx = get_each_context_10(ctx, each_value_10, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_10(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div1, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_10.length;
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div1);
			if_block0.d();
			if_block1.d();
			if_block2.d();
			destroy_each(each_blocks, detaching);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_11.name,
		type: "else",
		source: "(512:20) {:else}",
		ctx
	});

	return block;
}

// (417:20) {#if left_display_styles[active_left_tab] === "grid"}
function create_if_block_22(ctx) {
	let div;
	let each_value_9 = /*feedback_list*/ ctx[0];
	validate_each_argument(each_value_9);
	let each_blocks = [];

	for (let i = 0; i < each_value_9.length; i += 1) {
		each_blocks[i] = create_each_block_9(get_each_context_9(ctx, each_value_9, i));
	}

	const block = {
		c: function create() {
			div = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr_dev(div, "class", "grid svelte-qzsvuf");
			set_style(div, "overflow-y", "auto");
			add_location(div, file$1, 417, 24, 13964);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(div, null);
				}
			}
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*feedback_list, selected_feedback, active_right_tab, feedback_notes, context, mediaPlayer*/ 362513 | dirty[1] & /*selectFeedback, removeFeedback, addContext*/ 2240) {
				each_value_9 = /*feedback_list*/ ctx[0];
				validate_each_argument(each_value_9);
				let i;

				for (i = 0; i < each_value_9.length; i += 1) {
					const child_ctx = get_each_context_9(ctx, each_value_9, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_9(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_9.length;
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			destroy_each(each_blocks, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_22.name,
		type: "if",
		source: "(417:20) {#if left_display_styles[active_left_tab] === \\\"grid\\\"}",
		ctx
	});

	return block;
}

// (520:40) {:else}
function create_else_block_17(ctx) {
	let img;
	let img_src_value;

	const block = {
		c: function create() {
			img = element("img");
			set_style(img, "height", "1rem");
			set_style(img, "width", "1rem");
			if (!src_url_equal(img.src, img_src_value = "./logos/descending-sort-svgrepo-com.svg")) attr_dev(img, "src", img_src_value);
			attr_dev(img, "alt", "Sort descending");
			attr_dev(img, "class", "mini-icon");
			add_location(img, file$1, 520, 44, 22020);
		},
		m: function mount(target, anchor) {
			insert_dev(target, img, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(img);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_17.name,
		type: "else",
		source: "(520:40) {:else}",
		ctx
	});

	return block;
}

// (518:40) {#if sortAscending && sortKey==='id'}
function create_if_block_35(ctx) {
	let img;
	let img_src_value;

	const block = {
		c: function create() {
			img = element("img");
			set_style(img, "height", "1rem");
			set_style(img, "width", "1rem");
			if (!src_url_equal(img.src, img_src_value = "./logos/ascending-sort-svgrepo-com.svg")) attr_dev(img, "src", img_src_value);
			attr_dev(img, "alt", "Sort ascending");
			attr_dev(img, "class", "mini-icon");
			add_location(img, file$1, 518, 44, 21803);
		},
		m: function mount(target, anchor) {
			insert_dev(target, img, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(img);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_35.name,
		type: "if",
		source: "(518:40) {#if sortAscending && sortKey==='id'}",
		ctx
	});

	return block;
}

// (530:40) {:else}
function create_else_block_16(ctx) {
	let img;
	let img_src_value;

	const block = {
		c: function create() {
			img = element("img");
			set_style(img, "height", "1rem");
			set_style(img, "width", "1rem");
			if (!src_url_equal(img.src, img_src_value = "./logos/descending-sort-svgrepo-com.svg")) attr_dev(img, "src", img_src_value);
			attr_dev(img, "alt", "Sort descending");
			attr_dev(img, "class", "mini-icon");
			add_location(img, file$1, 530, 44, 22941);
		},
		m: function mount(target, anchor) {
			insert_dev(target, img, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(img);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_16.name,
		type: "else",
		source: "(530:40) {:else}",
		ctx
	});

	return block;
}

// (528:40) {#if sortAscending && sortKey==='quote'}
function create_if_block_34(ctx) {
	let img;
	let img_src_value;

	const block = {
		c: function create() {
			img = element("img");
			set_style(img, "height", "1rem");
			set_style(img, "width", "1rem");
			if (!src_url_equal(img.src, img_src_value = "./logos/ascending-sort-svgrepo-com.svg")) attr_dev(img, "src", img_src_value);
			attr_dev(img, "alt", "Sort ascending");
			attr_dev(img, "class", "mini-icon");
			add_location(img, file$1, 528, 44, 22724);
		},
		m: function mount(target, anchor) {
			insert_dev(target, img, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(img);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_34.name,
		type: "if",
		source: "(528:40) {#if sortAscending && sortKey==='quote'}",
		ctx
	});

	return block;
}

// (540:40) {:else}
function create_else_block_15(ctx) {
	let img;
	let img_src_value;

	const block = {
		c: function create() {
			img = element("img");
			set_style(img, "height", "1rem");
			set_style(img, "width", "1rem");
			if (!src_url_equal(img.src, img_src_value = "./logos/descending-sort-svgrepo-com.svg")) attr_dev(img, "src", img_src_value);
			attr_dev(img, "alt", "Sort descending");
			attr_dev(img, "class", "mini-icon");
			add_location(img, file$1, 540, 44, 23865);
		},
		m: function mount(target, anchor) {
			insert_dev(target, img, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(img);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_15.name,
		type: "else",
		source: "(540:40) {:else}",
		ctx
	});

	return block;
}

// (538:40) {#if sortAscending && sortKey==='speaker'}
function create_if_block_33(ctx) {
	let img;
	let img_src_value;

	const block = {
		c: function create() {
			img = element("img");
			set_style(img, "height", "1rem");
			set_style(img, "width", "1rem");
			if (!src_url_equal(img.src, img_src_value = "./logos/ascending-sort-svgrepo-com.svg")) attr_dev(img, "src", img_src_value);
			attr_dev(img, "alt", "Sort ascending");
			attr_dev(img, "class", "mini-icon");
			add_location(img, file$1, 538, 44, 23648);
		},
		m: function mount(target, anchor) {
			insert_dev(target, img, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(img);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_33.name,
		type: "if",
		source: "(538:40) {#if sortAscending && sortKey==='speaker'}",
		ctx
	});

	return block;
}

// (556:32) {#if feedback.type==="critical"}
function create_if_block_28(ctx) {
	let div2;
	let span0;
	let strong;
	let t0_value = /*feedback*/ ctx[166].id + "";
	let t0;
	let t1;
	let div0;
	let span2;
	let span1;
	let t2;
	let t3;
	let span3;

	let t4_value = (/*feedback*/ ctx[166].speaker
	? /*feedback*/ ctx[166].speaker
	: "Unknown") + "";

	let t4;
	let t5;
	let div1;
	let button0;
	let img0;
	let img0_src_value;
	let t6;
	let t7;
	let button1;
	let img1;
	let img1_src_value;
	let t8;
	let t9;
	let button2;
	let img2;
	let img2_src_value;
	let t10;
	let t11;
	let button3;
	let img3;
	let img3_src_value;
	let t12;
	let t13;
	let span4;
	let input;
	let t14;
	let mounted;
	let dispose;

	function select_block_type_8(ctx, dirty) {
		if ("excerpt_reference" in /*feedback*/ ctx[166]) return create_if_block_31;
		return create_else_block_14;
	}

	let current_block_type = select_block_type_8(ctx);
	let if_block0 = current_block_type(ctx);

	function click_handler_15() {
		return /*click_handler_15*/ ctx[65](/*feedback*/ ctx[166]);
	}

	function select_block_type_10(ctx, dirty) {
		if (/*feedback*/ ctx[166].positivised_quote && /*feedback*/ ctx[166].show_paraphrased) return create_if_block_29;
		return create_else_block_12;
	}

	let current_block_type_1 = select_block_type_10(ctx);
	let if_block1 = current_block_type_1(ctx);

	function click_handler_18() {
		return /*click_handler_18*/ ctx[68](/*feedback*/ ctx[166], /*each_value_10*/ ctx[168], /*i*/ ctx[147]);
	}

	function click_handler_19() {
		return /*click_handler_19*/ ctx[69](/*feedback*/ ctx[166]);
	}

	function click_handler_20() {
		return /*click_handler_20*/ ctx[70](/*feedback*/ ctx[166]);
	}

	function click_handler_21() {
		return /*click_handler_21*/ ctx[71](/*feedback*/ ctx[166]);
	}

	function input_change_handler_1() {
		/*input_change_handler_1*/ ctx[72].call(input, /*each_value_10*/ ctx[168], /*i*/ ctx[147]);
	}

	function click_handler_22(...args) {
		return /*click_handler_22*/ ctx[73](/*feedback*/ ctx[166], ...args);
	}

	const block = {
		c: function create() {
			div2 = element("div");
			span0 = element("span");
			strong = element("strong");
			t0 = text(t0_value);
			t1 = space();
			div0 = element("div");
			span2 = element("span");
			span1 = element("span");
			if_block0.c();
			t2 = space();
			if_block1.c();
			t3 = space();
			span3 = element("span");
			t4 = text(t4_value);
			t5 = space();
			div1 = element("div");
			button0 = element("button");
			img0 = element("img");
			t6 = text("\n                                                Positivize");
			t7 = space();
			button1 = element("button");
			img1 = element("img");
			t8 = text("\n                                                Select Context");
			t9 = space();
			button2 = element("button");
			img2 = element("img");
			t10 = text("\n                                                Add Note");
			t11 = space();
			button3 = element("button");
			img3 = element("img");
			t12 = text("\n                                                Delete");
			t13 = space();
			span4 = element("span");
			input = element("input");
			t14 = space();
			add_location(strong, file$1, 564, 44, 25854);
			attr_dev(span0, "class", "id-col svelte-qzsvuf");
			add_location(span0, file$1, 563, 40, 25788);
			attr_dev(span1, "class", "timestamp svelte-qzsvuf");
			add_location(span1, file$1, 568, 48, 26119);
			attr_dev(span2, "class", "");
			add_location(span2, file$1, 567, 44, 26054);
			attr_dev(div0, "class", "column feedback-col svelte-qzsvuf");
			add_location(div0, file$1, 566, 40, 25975);
			attr_dev(span3, "class", "centered speaker-col svelte-qzsvuf");
			add_location(span3, file$1, 600, 40, 29008);
			if (!src_url_equal(img0.src, img0_src_value = "./logos/ai-positive-paraphrase.png")) attr_dev(img0, "src", img0_src_value);
			attr_dev(img0, "alt", "Paraphrase positively");
			attr_dev(img0, "class", "action-icon");
			add_location(img0, file$1, 610, 48, 29923);
			attr_dev(button0, "class", "action-button");
			add_location(button0, file$1, 604, 44, 29340);
			if (!src_url_equal(img1.src, img1_src_value = "./logos/select-context.svg")) attr_dev(img1, "src", img1_src_value);
			attr_dev(img1, "alt", "Select feedback as context");
			set_style(img1, "height", "3.3rem");
			set_style(img1, "width", "3.3rem");
			add_location(img1, file$1, 619, 48, 30589);
			attr_dev(button1, "class", "action-button centered column");
			add_location(button1, file$1, 614, 44, 30176);
			if (!src_url_equal(img2.src, img2_src_value = "./logos/note-svgrepo-com.svg")) attr_dev(img2, "src", img2_src_value);
			attr_dev(img2, "alt", "Remove feedback");
			attr_dev(img2, "class", "action-icon");
			add_location(img2, file$1, 630, 48, 31480);
			attr_dev(button2, "class", "action-button");
			add_location(button2, file$1, 622, 44, 30861);
			if (!src_url_equal(img3.src, img3_src_value = "./logos/delete-svgrepo-com.svg")) attr_dev(img3, "src", img3_src_value);
			attr_dev(img3, "alt", "Remove feedback");
			attr_dev(img3, "class", "action-icon");
			add_location(img3, file$1, 643, 48, 32519);
			attr_dev(button3, "class", "action-button");
			add_location(button3, file$1, 633, 44, 31718);
			attr_dev(div1, "id", "feedback-buttons");
			attr_dev(div1, "class", "row centered spaced actions-col svelte-qzsvuf");
			add_location(div1, file$1, 603, 40, 29227);
			attr_dev(input, "type", "checkbox");
			add_location(input, file$1, 649, 44, 32923);
			attr_dev(span4, "class", "centered done-col svelte-qzsvuf");
			add_location(span4, file$1, 648, 40, 32845);
			attr_dev(div2, "class", "feedback-row row bordered padded svelte-qzsvuf");
			toggle_class(div2, "done", /*feedback*/ ctx[166].done);
			toggle_class(div2, "selected", /*feedback*/ ctx[166] === /*selected_feedback*/ ctx[15]);
			add_location(div2, file$1, 556, 36, 25224);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div2, anchor);
			append_dev(div2, span0);
			append_dev(span0, strong);
			append_dev(strong, t0);
			append_dev(div2, t1);
			append_dev(div2, div0);
			append_dev(div0, span2);
			append_dev(span2, span1);
			if_block0.m(span1, null);
			append_dev(span2, t2);
			if_block1.m(span2, null);
			append_dev(div2, t3);
			append_dev(div2, span3);
			append_dev(span3, t4);
			append_dev(div2, t5);
			append_dev(div2, div1);
			append_dev(div1, button0);
			append_dev(button0, img0);
			append_dev(button0, t6);
			append_dev(div1, t7);
			append_dev(div1, button1);
			append_dev(button1, img1);
			append_dev(button1, t8);
			append_dev(div1, t9);
			append_dev(div1, button2);
			append_dev(button2, img2);
			append_dev(button2, t10);
			append_dev(div1, t11);
			append_dev(div1, button3);
			append_dev(button3, img3);
			append_dev(button3, t12);
			append_dev(div2, t13);
			append_dev(div2, span4);
			append_dev(span4, input);
			input.checked = /*feedback*/ ctx[166].done;
			append_dev(div2, t14);

			if (!mounted) {
				dispose = [
					listen_dev(span1, "click", click_handler_15, false, false, false, false),
					listen_dev(button0, "click", click_handler_18, false, false, false, false),
					listen_dev(button1, "click", click_handler_19, false, false, false, false),
					listen_dev(button2, "click", click_handler_20, false, false, false, false),
					listen_dev(button3, "click", click_handler_21, false, false, false, false),
					listen_dev(input, "change", input_change_handler_1),
					listen_dev(div2, "click", click_handler_22, false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty[0] & /*feedback_list*/ 1 && t0_value !== (t0_value = /*feedback*/ ctx[166].id + "")) set_data_dev(t0, t0_value);

			if (current_block_type === (current_block_type = select_block_type_8(ctx)) && if_block0) {
				if_block0.p(ctx, dirty);
			} else {
				if_block0.d(1);
				if_block0 = current_block_type(ctx);

				if (if_block0) {
					if_block0.c();
					if_block0.m(span1, null);
				}
			}

			if (current_block_type_1 === (current_block_type_1 = select_block_type_10(ctx)) && if_block1) {
				if_block1.p(ctx, dirty);
			} else {
				if_block1.d(1);
				if_block1 = current_block_type_1(ctx);

				if (if_block1) {
					if_block1.c();
					if_block1.m(span2, null);
				}
			}

			if (dirty[0] & /*feedback_list*/ 1 && t4_value !== (t4_value = (/*feedback*/ ctx[166].speaker
			? /*feedback*/ ctx[166].speaker
			: "Unknown") + "")) set_data_dev(t4, t4_value);

			if (dirty[0] & /*feedback_list*/ 1) {
				input.checked = /*feedback*/ ctx[166].done;
			}

			if (dirty[0] & /*feedback_list*/ 1) {
				toggle_class(div2, "done", /*feedback*/ ctx[166].done);
			}

			if (dirty[0] & /*feedback_list, selected_feedback*/ 32769) {
				toggle_class(div2, "selected", /*feedback*/ ctx[166] === /*selected_feedback*/ ctx[15]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div2);
			if_block0.d();
			if_block1.d();
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_28.name,
		type: "if",
		source: "(556:32) {#if feedback.type===\\\"critical\\\"}",
		ctx
	});

	return block;
}

// (585:52) {:else}
function create_else_block_14(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("[00:00:00]");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		p: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_14.name,
		type: "else",
		source: "(585:52) {:else}",
		ctx
	});

	return block;
}

// (579:52) {#if "excerpt_reference" in feedback}
function create_if_block_31(ctx) {
	let if_block_anchor;

	function select_block_type_9(ctx, dirty) {
		if ("start_timestamp" in /*feedback*/ ctx[166].excerpt_reference) return create_if_block_32;
		return create_else_block_13;
	}

	let current_block_type = select_block_type_9(ctx);
	let if_block = current_block_type(ctx);

	const block = {
		c: function create() {
			if_block.c();
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (current_block_type === (current_block_type = select_block_type_9(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			}
		},
		d: function destroy(detaching) {
			if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_31.name,
		type: "if",
		source: "(579:52) {#if \\\"excerpt_reference\\\" in feedback}",
		ctx
	});

	return block;
}

// (582:56) {:else}
function create_else_block_13(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("[00:00:00]");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		p: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_13.name,
		type: "else",
		source: "(582:56) {:else}",
		ctx
	});

	return block;
}

// (580:56) {#if "start_timestamp" in feedback.excerpt_reference}
function create_if_block_32(ctx) {
	let t0;
	let t1_value = /*feedback*/ ctx[166].excerpt_reference.start_timestamp + "";
	let t1;
	let t2;

	const block = {
		c: function create() {
			t0 = text("[");
			t1 = text(t1_value);
			t2 = text("]");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t0, anchor);
			insert_dev(target, t1, anchor);
			insert_dev(target, t2, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*feedback_list*/ 1 && t1_value !== (t1_value = /*feedback*/ ctx[166].excerpt_reference.start_timestamp + "")) set_data_dev(t1, t1_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(t1);
			if (detaching) detach_dev(t2);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_32.name,
		type: "if",
		source: "(580:56) {#if \\\"start_timestamp\\\" in feedback.excerpt_reference}",
		ctx
	});

	return block;
}

// (594:48) {:else}
function create_else_block_12(ctx) {
	let t0;
	let t1_value = /*feedback*/ ctx[166].quote + "";
	let t1;
	let t2;
	let if_block_anchor;
	let if_block = /*feedback*/ ctx[166].positivised_quote && !/*feedback*/ ctx[166].show_paraphrased && create_if_block_30(ctx);

	const block = {
		c: function create() {
			t0 = text("\"");
			t1 = text(t1_value);
			t2 = text("\" ");
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			insert_dev(target, t0, anchor);
			insert_dev(target, t1, anchor);
			insert_dev(target, t2, anchor);
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*feedback_list*/ 1 && t1_value !== (t1_value = /*feedback*/ ctx[166].quote + "")) set_data_dev(t1, t1_value);

			if (/*feedback*/ ctx[166].positivised_quote && !/*feedback*/ ctx[166].show_paraphrased) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_30(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(t1);
			if (detaching) detach_dev(t2);
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_12.name,
		type: "else",
		source: "(594:48) {:else}",
		ctx
	});

	return block;
}

// (589:48) {#if feedback.positivised_quote && feedback.show_paraphrased}
function create_if_block_29(ctx) {
	let strong;
	let t1;
	let t2_value = /*feedback*/ ctx[166].positivised_quote + "";
	let t2;
	let t3;
	let span;
	let mounted;
	let dispose;

	function click_handler_16() {
		return /*click_handler_16*/ ctx[66](/*feedback*/ ctx[166]);
	}

	const block = {
		c: function create() {
			strong = element("strong");
			strong.textContent = "(Paraphrased Feedback)";
			t1 = text(" \"");
			t2 = text(t2_value);
			t3 = text("\" \n                                                    ");
			span = element("span");
			span.textContent = "(View original quote)";
			add_location(strong, file$1, 589, 52, 27884);
			attr_dev(span, "class", "clickable svelte-qzsvuf");
			add_location(span, file$1, 590, 52, 28008);
		},
		m: function mount(target, anchor) {
			insert_dev(target, strong, anchor);
			insert_dev(target, t1, anchor);
			insert_dev(target, t2, anchor);
			insert_dev(target, t3, anchor);
			insert_dev(target, span, anchor);

			if (!mounted) {
				dispose = listen_dev(span, "click", click_handler_16, false, false, false, false);
				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty[0] & /*feedback_list*/ 1 && t2_value !== (t2_value = /*feedback*/ ctx[166].positivised_quote + "")) set_data_dev(t2, t2_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(strong);
			if (detaching) detach_dev(t1);
			if (detaching) detach_dev(t2);
			if (detaching) detach_dev(t3);
			if (detaching) detach_dev(span);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_29.name,
		type: "if",
		source: "(589:48) {#if feedback.positivised_quote && feedback.show_paraphrased}",
		ctx
	});

	return block;
}

// (595:71) {#if feedback.positivised_quote && !feedback.show_paraphrased }
function create_if_block_30(ctx) {
	let span;
	let mounted;
	let dispose;

	function click_handler_17() {
		return /*click_handler_17*/ ctx[67](/*feedback*/ ctx[166]);
	}

	const block = {
		c: function create() {
			span = element("span");
			span.textContent = "(View paraphrased quote)";
			attr_dev(span, "class", "clickable svelte-qzsvuf");
			add_location(span, file$1, 595, 52, 28553);
		},
		m: function mount(target, anchor) {
			insert_dev(target, span, anchor);

			if (!mounted) {
				dispose = listen_dev(span, "click", click_handler_17, false, false, false, false);
				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(span);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_30.name,
		type: "if",
		source: "(595:71) {#if feedback.positivised_quote && !feedback.show_paraphrased }",
		ctx
	});

	return block;
}

// (555:28) {#each feedback_list as feedback, i}
function create_each_block_10(ctx) {
	let if_block_anchor;
	let if_block = /*feedback*/ ctx[166].type === "critical" && create_if_block_28(ctx);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (/*feedback*/ ctx[166].type === "critical") {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_28(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		d: function destroy(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_10.name,
		type: "each",
		source: "(555:28) {#each feedback_list as feedback, i}",
		ctx
	});

	return block;
}

// (420:32) {#if feedback.type==="critical"}
function create_if_block_23(ctx) {
	let div2;
	let div1;
	let small;
	let t0;
	let div0;
	let button0;
	let img0;
	let img0_src_value;
	let t1;
	let button1;
	let img1;
	let img1_src_value;
	let t2;
	let button2;
	let img2;
	let img2_src_value;
	let t3;
	let button3;
	let img3;
	let img3_src_value;
	let t4;
	let span0;
	let input;
	let t5;
	let br0;
	let t6;
	let strong;
	let t7;
	let t8_value = /*feedback*/ ctx[166].id + "";
	let t8;
	let t9;
	let t10;
	let t11;
	let br1;
	let t12;
	let span1;
	let t13;
	let t14_value = /*feedback*/ ctx[166].speaker + "";
	let t14;
	let t15;
	let mounted;
	let dispose;

	function select_block_type_2(ctx, dirty) {
		if ("excerpt_reference" in /*feedback*/ ctx[166]) return create_if_block_26;
		return create_else_block_10;
	}

	let current_block_type = select_block_type_2(ctx);
	let if_block0 = current_block_type(ctx);

	function click_handler_3() {
		return /*click_handler_3*/ ctx[52](/*feedback*/ ctx[166]);
	}

	function click_handler_4() {
		return /*click_handler_4*/ ctx[53](/*feedback*/ ctx[166], /*each_value_9*/ ctx[167], /*i*/ ctx[147]);
	}

	function click_handler_5() {
		return /*click_handler_5*/ ctx[54](/*feedback*/ ctx[166]);
	}

	function click_handler_6() {
		return /*click_handler_6*/ ctx[55](/*feedback*/ ctx[166]);
	}

	function click_handler_7() {
		return /*click_handler_7*/ ctx[56](/*feedback*/ ctx[166]);
	}

	function input_change_handler() {
		/*input_change_handler*/ ctx[57].call(input, /*each_value_9*/ ctx[167], /*i*/ ctx[147]);
	}

	function select_block_type_4(ctx, dirty) {
		if (/*feedback*/ ctx[166].positivised_quote && /*feedback*/ ctx[166].show_paraphrased) return create_if_block_24;
		return create_else_block_8;
	}

	let current_block_type_1 = select_block_type_4(ctx);
	let if_block1 = current_block_type_1(ctx);

	function click_handler_10(...args) {
		return /*click_handler_10*/ ctx[60](/*feedback*/ ctx[166], ...args);
	}

	const block = {
		c: function create() {
			div2 = element("div");
			div1 = element("div");
			small = element("small");
			if_block0.c();
			t0 = space();
			div0 = element("div");
			button0 = element("button");
			img0 = element("img");
			t1 = space();
			button1 = element("button");
			img1 = element("img");
			t2 = space();
			button2 = element("button");
			img2 = element("img");
			t3 = space();
			button3 = element("button");
			img3 = element("img");
			t4 = space();
			span0 = element("span");
			input = element("input");
			t5 = space();
			br0 = element("br");
			t6 = space();
			strong = element("strong");
			t7 = text("F#");
			t8 = text(t8_value);
			t9 = text(":");
			t10 = space();
			if_block1.c();
			t11 = space();
			br1 = element("br");
			t12 = space();
			span1 = element("span");
			t13 = text("- ");
			t14 = text(t14_value);
			t15 = space();
			attr_dev(small, "class", "timestamp svelte-qzsvuf");
			add_location(small, file$1, 427, 44, 14777);
			if (!src_url_equal(img0.src, img0_src_value = "./logos/ai-positive-paraphrase.png")) attr_dev(img0, "src", img0_src_value);
			attr_dev(img0, "alt", "Paraphrase positively");
			attr_dev(img0, "class", "mini-icon");
			add_location(img0, file$1, 456, 52, 17031);
			attr_dev(button0, "class", "action-button");
			add_location(button0, file$1, 450, 48, 16424);
			if (!src_url_equal(img1.src, img1_src_value = "./logos/select-context.svg")) attr_dev(img1, "src", img1_src_value);
			attr_dev(img1, "alt", "Select feedback as context");
			set_style(img1, "height", "2.3rem");
			set_style(img1, "width", "2.3rem");
			add_location(img1, file$1, 464, 52, 17701);
			attr_dev(button1, "class", "action-button");
			add_location(button1, file$1, 459, 48, 17280);
			if (!src_url_equal(img2.src, img2_src_value = "./logos/note-svgrepo-com.svg")) attr_dev(img2, "src", img2_src_value);
			attr_dev(img2, "alt", "Add note");
			attr_dev(img2, "class", "mini-icon");
			add_location(img2, file$1, 475, 52, 18572);
			attr_dev(button2, "class", "action-button");
			add_location(button2, file$1, 467, 48, 17919);
			if (!src_url_equal(img3.src, img3_src_value = "./logos/delete-svgrepo-com.svg")) attr_dev(img3, "src", img3_src_value);
			attr_dev(img3, "alt", "Remove critical feedback");
			set_style(img3, "height", "2rem");
			set_style(img3, "width", "2rem");
			add_location(img3, file$1, 483, 52, 19204);
			attr_dev(button3, "class", "action-button");
			add_location(button3, file$1, 478, 48, 18754);
			attr_dev(input, "type", "checkbox");
			add_location(input, file$1, 487, 52, 19497);
			attr_dev(span0, "class", "centered");
			add_location(span0, file$1, 486, 48, 19420);
			attr_dev(div0, "class", "row spaced");
			add_location(div0, file$1, 448, 44, 16350);
			attr_dev(div1, "class", "note-header row space-between");
			add_location(div1, file$1, 426, 40, 14689);
			add_location(br0, file$1, 493, 40, 19788);
			add_location(strong, file$1, 494, 40, 19833);
			add_location(br1, file$1, 505, 40, 20975);
			add_location(span1, file$1, 506, 40, 21020);
			attr_dev(div2, "class", "critical-feedback-note svelte-qzsvuf");
			toggle_class(div2, "done", /*feedback*/ ctx[166].done);
			toggle_class(div2, "selected", /*feedback*/ ctx[166] === /*selected_feedback*/ ctx[15]);
			add_location(div2, file$1, 420, 36, 14175);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div2, anchor);
			append_dev(div2, div1);
			append_dev(div1, small);
			if_block0.m(small, null);
			append_dev(div1, t0);
			append_dev(div1, div0);
			append_dev(div0, button0);
			append_dev(button0, img0);
			append_dev(div0, t1);
			append_dev(div0, button1);
			append_dev(button1, img1);
			append_dev(div0, t2);
			append_dev(div0, button2);
			append_dev(button2, img2);
			append_dev(div0, t3);
			append_dev(div0, button3);
			append_dev(button3, img3);
			append_dev(div0, t4);
			append_dev(div0, span0);
			append_dev(span0, input);
			input.checked = /*feedback*/ ctx[166].done;
			append_dev(div2, t5);
			append_dev(div2, br0);
			append_dev(div2, t6);
			append_dev(div2, strong);
			append_dev(strong, t7);
			append_dev(strong, t8);
			append_dev(strong, t9);
			append_dev(div2, t10);
			if_block1.m(div2, null);
			append_dev(div2, t11);
			append_dev(div2, br1);
			append_dev(div2, t12);
			append_dev(div2, span1);
			append_dev(span1, t13);
			append_dev(span1, t14);
			append_dev(div2, t15);

			if (!mounted) {
				dispose = [
					listen_dev(small, "click", click_handler_3, false, false, false, false),
					listen_dev(button0, "click", click_handler_4, false, false, false, false),
					listen_dev(button1, "click", click_handler_5, false, false, false, false),
					listen_dev(button2, "click", click_handler_6, false, false, false, false),
					listen_dev(button3, "click", click_handler_7, false, false, false, false),
					listen_dev(input, "change", input_change_handler),
					listen_dev(div2, "click", click_handler_10, false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;

			if (current_block_type === (current_block_type = select_block_type_2(ctx)) && if_block0) {
				if_block0.p(ctx, dirty);
			} else {
				if_block0.d(1);
				if_block0 = current_block_type(ctx);

				if (if_block0) {
					if_block0.c();
					if_block0.m(small, null);
				}
			}

			if (dirty[0] & /*feedback_list*/ 1) {
				input.checked = /*feedback*/ ctx[166].done;
			}

			if (dirty[0] & /*feedback_list*/ 1 && t8_value !== (t8_value = /*feedback*/ ctx[166].id + "")) set_data_dev(t8, t8_value);

			if (current_block_type_1 === (current_block_type_1 = select_block_type_4(ctx)) && if_block1) {
				if_block1.p(ctx, dirty);
			} else {
				if_block1.d(1);
				if_block1 = current_block_type_1(ctx);

				if (if_block1) {
					if_block1.c();
					if_block1.m(div2, t11);
				}
			}

			if (dirty[0] & /*feedback_list*/ 1 && t14_value !== (t14_value = /*feedback*/ ctx[166].speaker + "")) set_data_dev(t14, t14_value);

			if (dirty[0] & /*feedback_list*/ 1) {
				toggle_class(div2, "done", /*feedback*/ ctx[166].done);
			}

			if (dirty[0] & /*feedback_list, selected_feedback*/ 32769) {
				toggle_class(div2, "selected", /*feedback*/ ctx[166] === /*selected_feedback*/ ctx[15]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div2);
			if_block0.d();
			if_block1.d();
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_23.name,
		type: "if",
		source: "(420:32) {#if feedback.type===\\\"critical\\\"}",
		ctx
	});

	return block;
}

// (444:48) {:else}
function create_else_block_10(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("[00:00:00]");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		p: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_10.name,
		type: "else",
		source: "(444:48) {:else}",
		ctx
	});

	return block;
}

// (438:48) {#if "excerpt_reference" in feedback}
function create_if_block_26(ctx) {
	let if_block_anchor;

	function select_block_type_3(ctx, dirty) {
		if ("start_timestamp" in /*feedback*/ ctx[166].excerpt_reference) return create_if_block_27;
		return create_else_block_9;
	}

	let current_block_type = select_block_type_3(ctx);
	let if_block = current_block_type(ctx);

	const block = {
		c: function create() {
			if_block.c();
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (current_block_type === (current_block_type = select_block_type_3(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			}
		},
		d: function destroy(detaching) {
			if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_26.name,
		type: "if",
		source: "(438:48) {#if \\\"excerpt_reference\\\" in feedback}",
		ctx
	});

	return block;
}

// (441:52) {:else}
function create_else_block_9(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("[00:00:00]");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		p: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_9.name,
		type: "else",
		source: "(441:52) {:else}",
		ctx
	});

	return block;
}

// (439:52) {#if "start_timestamp" in feedback.excerpt_reference}
function create_if_block_27(ctx) {
	let t0;
	let t1_value = /*feedback*/ ctx[166].excerpt_reference.start_timestamp + "";
	let t1;
	let t2;

	const block = {
		c: function create() {
			t0 = text("[");
			t1 = text(t1_value);
			t2 = text("]");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t0, anchor);
			insert_dev(target, t1, anchor);
			insert_dev(target, t2, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*feedback_list*/ 1 && t1_value !== (t1_value = /*feedback*/ ctx[166].excerpt_reference.start_timestamp + "")) set_data_dev(t1, t1_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(t1);
			if (detaching) detach_dev(t2);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_27.name,
		type: "if",
		source: "(439:52) {#if \\\"start_timestamp\\\" in feedback.excerpt_reference}",
		ctx
	});

	return block;
}

// (501:40) {:else}
function create_else_block_8(ctx) {
	let t0;
	let t1_value = /*feedback*/ ctx[166].quote + "";
	let t1;
	let t2;
	let if_block_anchor;
	let if_block = /*feedback*/ ctx[166].positivised_quote && !/*feedback*/ ctx[166].show_paraphrased && create_if_block_25(ctx);

	const block = {
		c: function create() {
			t0 = text("\"");
			t1 = text(t1_value);
			t2 = text("\" ");
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			insert_dev(target, t0, anchor);
			insert_dev(target, t1, anchor);
			insert_dev(target, t2, anchor);
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*feedback_list*/ 1 && t1_value !== (t1_value = /*feedback*/ ctx[166].quote + "")) set_data_dev(t1, t1_value);

			if (/*feedback*/ ctx[166].positivised_quote && !/*feedback*/ ctx[166].show_paraphrased) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_25(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(t1);
			if (detaching) detach_dev(t2);
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_8.name,
		type: "else",
		source: "(501:40) {:else}",
		ctx
	});

	return block;
}

// (496:40) {#if feedback.positivised_quote && feedback.show_paraphrased}
function create_if_block_24(ctx) {
	let strong;
	let t1;
	let t2_value = /*feedback*/ ctx[166].positivised_quote + "";
	let t2;
	let t3;
	let span;
	let mounted;
	let dispose;

	function click_handler_8() {
		return /*click_handler_8*/ ctx[58](/*feedback*/ ctx[166]);
	}

	const block = {
		c: function create() {
			strong = element("strong");
			strong.textContent = "(Paraphrased Feedback)";
			t1 = text(" \"");
			t2 = text(t2_value);
			t3 = text("\" \n                                            ");
			span = element("span");
			span.textContent = "(View original quote)";
			add_location(strong, file$1, 496, 44, 20014);
			attr_dev(span, "class", "clickable svelte-qzsvuf");
			add_location(span, file$1, 497, 44, 20130);
		},
		m: function mount(target, anchor) {
			insert_dev(target, strong, anchor);
			insert_dev(target, t1, anchor);
			insert_dev(target, t2, anchor);
			insert_dev(target, t3, anchor);
			insert_dev(target, span, anchor);

			if (!mounted) {
				dispose = listen_dev(span, "click", click_handler_8, false, false, false, false);
				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty[0] & /*feedback_list*/ 1 && t2_value !== (t2_value = /*feedback*/ ctx[166].positivised_quote + "")) set_data_dev(t2, t2_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(strong);
			if (detaching) detach_dev(t1);
			if (detaching) detach_dev(t2);
			if (detaching) detach_dev(t3);
			if (detaching) detach_dev(span);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_24.name,
		type: "if",
		source: "(496:40) {#if feedback.positivised_quote && feedback.show_paraphrased}",
		ctx
	});

	return block;
}

// (502:63) {#if feedback.positivised_quote && !feedback.show_paraphrased }
function create_if_block_25(ctx) {
	let span;
	let mounted;
	let dispose;

	function click_handler_9() {
		return /*click_handler_9*/ ctx[59](/*feedback*/ ctx[166]);
	}

	const block = {
		c: function create() {
			span = element("span");
			span.textContent = "(View paraphrased quote)";
			attr_dev(span, "class", "clickable svelte-qzsvuf");
			add_location(span, file$1, 502, 44, 20635);
		},
		m: function mount(target, anchor) {
			insert_dev(target, span, anchor);

			if (!mounted) {
				dispose = listen_dev(span, "click", click_handler_9, false, false, false, false);
				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(span);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_25.name,
		type: "if",
		source: "(502:63) {#if feedback.positivised_quote && !feedback.show_paraphrased }",
		ctx
	});

	return block;
}

// (419:28) {#each feedback_list as feedback, i}
function create_each_block_9(ctx) {
	let if_block_anchor;
	let if_block = /*feedback*/ ctx[166].type === "critical" && create_if_block_23(ctx);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (/*feedback*/ ctx[166].type === "critical") {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_23(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		d: function destroy(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_9.name,
		type: "each",
		source: "(419:28) {#each feedback_list as feedback, i}",
		ctx
	});

	return block;
}

// (905:16) {#each right_panel_tabs as tab, i}
function create_each_block_8(ctx) {
	let button;
	let t_value = /*tab*/ ctx[164] + "";
	let t;
	let mounted;
	let dispose;

	function click_handler_42() {
		return /*click_handler_42*/ ctx[93](/*i*/ ctx[147]);
	}

	const block = {
		c: function create() {
			button = element("button");
			t = text(t_value);
			attr_dev(button, "class", "tab svelte-qzsvuf");
			toggle_class(button, "active", /*i*/ ctx[147] === /*active_right_tab*/ ctx[16]);
			toggle_class(button, "right-bordered", /*i*/ ctx[147] < /*right_panel_tabs*/ ctx[36].length - 1);
			add_location(button, file$1, 905, 20, 52549);
		},
		m: function mount(target, anchor) {
			insert_dev(target, button, anchor);
			append_dev(button, t);

			if (!mounted) {
				dispose = listen_dev(button, "click", click_handler_42, false, false, false, false);
				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty[0] & /*active_right_tab*/ 65536) {
				toggle_class(button, "active", /*i*/ ctx[147] === /*active_right_tab*/ ctx[16]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(button);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_8.name,
		type: "each",
		source: "(905:16) {#each right_panel_tabs as tab, i}",
		ctx
	});

	return block;
}

// (1301:47) 
function create_if_block_15(ctx) {
	let div5;
	let div3;
	let div0;
	let span0;
	let strong0;
	let t1;
	let div1;
	let current_block_type_index;
	let if_block0;
	let t2;
	let t3;
	let div2;
	let button0;
	let img0;
	let img0_src_value;
	let t4;
	let t5;
	let button1;
	let img1;
	let img1_src_value;
	let t6;
	let t7;
	let div4;
	let span1;
	let strong1;
	let t9;
	let show_if;
	let current_block_type_index_1;
	let if_block2;
	let current;
	let mounted;
	let dispose;
	const if_block_creators = [create_if_block_20, create_else_block_7];
	const if_blocks = [];

	function select_block_type_27(ctx, dirty) {
		if (/*my_notes*/ ctx[3].length > 0) return 0;
		return 1;
	}

	current_block_type_index = select_block_type_27(ctx);
	if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	let if_block1 = /*adding_note*/ ctx[32] && create_if_block_19(ctx);
	const if_block_creators_1 = [create_if_block_16, create_else_block_6];
	const if_blocks_1 = [];

	function select_block_type_28(ctx, dirty) {
		if (dirty[0] & /*feedback_notes*/ 16) show_if = null;
		if (show_if == null) show_if = !!(Object.keys(/*feedback_notes*/ ctx[4]).length > 0);
		if (show_if) return 0;
		return 1;
	}

	current_block_type_index_1 = select_block_type_28(ctx, [-1, -1, -1, -1, -1, -1]);
	if_block2 = if_blocks_1[current_block_type_index_1] = if_block_creators_1[current_block_type_index_1](ctx);

	const block = {
		c: function create() {
			div5 = element("div");
			div3 = element("div");
			div0 = element("div");
			span0 = element("span");
			strong0 = element("strong");
			strong0.textContent = "My Notes";
			t1 = space();
			div1 = element("div");
			if_block0.c();
			t2 = space();
			if (if_block1) if_block1.c();
			t3 = space();
			div2 = element("div");
			button0 = element("button");
			img0 = element("img");
			t4 = text("\n                                    Add Note");
			t5 = space();
			button1 = element("button");
			img1 = element("img");
			t6 = text("\n                                    Delete all");
			t7 = space();
			div4 = element("div");
			span1 = element("span");
			strong1 = element("strong");
			strong1.textContent = "My Feedback Notes";
			t9 = space();
			if_block2.c();
			add_location(strong0, file$1, 1304, 75, 83521);
			set_style(span0, "text-decoration", "underline");
			add_location(span0, file$1, 1304, 32, 83478);
			attr_dev(div0, "class", "row centered");
			set_style(div0, "width", "100%");
			set_style(div0, "height", "auto");
			add_location(div0, file$1, 1303, 28, 83386);
			attr_dev(div1, "class", "column bordered");
			set_style(div1, "width", "100%");
			set_style(div1, "height", "auto");
			toggle_class(div1, "centered", /*my_notes*/ ctx[3].length <= 0);
			add_location(div1, file$1, 1306, 28, 83620);
			if (!src_url_equal(img0.src, img0_src_value = "./logos/note-svgrepo-com.svg")) attr_dev(img0, "src", img0_src_value);
			attr_dev(img0, "alt", "Add Note");
			attr_dev(img0, "class", "action-icon");
			add_location(img0, file$1, 1364, 36, 87909);
			attr_dev(button0, "class", "action-button centered column");
			add_location(button0, file$1, 1358, 32, 87511);
			if (!src_url_equal(img1.src, img1_src_value = "./logos/delete-svgrepo-com.svg")) attr_dev(img1, "src", img1_src_value);
			attr_dev(img1, "alt", "Delete all notes");
			attr_dev(img1, "class", "action-icon");
			add_location(img1, file$1, 1378, 36, 88867);
			attr_dev(button1, "class", "action-button centered column");
			add_location(button1, file$1, 1367, 32, 88104);
			attr_dev(div2, "class", "row centered spaced");
			add_location(div2, file$1, 1357, 28, 87445);
			attr_dev(div3, "class", "column centered spaced padded");
			set_style(div3, "width", "100%");
			set_style(div3, "height", "auto");
			add_location(div3, file$1, 1302, 24, 83281);
			add_location(strong1, file$1, 1386, 71, 89302);
			set_style(span1, "text-decoration", "underline");
			add_location(span1, file$1, 1386, 28, 89259);
			attr_dev(div4, "class", "row centered");
			set_style(div4, "width", "100%");
			set_style(div4, "height", "auto");
			add_location(div4, file$1, 1385, 24, 89171);
			attr_dev(div5, "class", "column spaced padded");
			set_style(div5, "width", "100%");
			set_style(div5, "height", "100%");
			set_style(div5, "overflow-y", "auto");
			add_location(div5, file$1, 1301, 20, 83169);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div5, anchor);
			append_dev(div5, div3);
			append_dev(div3, div0);
			append_dev(div0, span0);
			append_dev(span0, strong0);
			append_dev(div3, t1);
			append_dev(div3, div1);
			if_blocks[current_block_type_index].m(div1, null);
			append_dev(div1, t2);
			if (if_block1) if_block1.m(div1, null);
			append_dev(div3, t3);
			append_dev(div3, div2);
			append_dev(div2, button0);
			append_dev(button0, img0);
			append_dev(button0, t4);
			append_dev(div2, t5);
			append_dev(div2, button1);
			append_dev(button1, img1);
			append_dev(button1, t6);
			append_dev(div5, t7);
			append_dev(div5, div4);
			append_dev(div4, span1);
			append_dev(span1, strong1);
			append_dev(div5, t9);
			if_blocks_1[current_block_type_index_1].m(div5, null);
			current = true;

			if (!mounted) {
				dispose = [
					listen_dev(button0, "click", /*click_handler_62*/ ctx[134], false, false, false, false),
					listen_dev(button1, "click", /*click_handler_63*/ ctx[135], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type_27(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block0 = if_blocks[current_block_type_index];

				if (!if_block0) {
					if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block0.c();
				} else {
					if_block0.p(ctx, dirty);
				}

				transition_in(if_block0, 1);
				if_block0.m(div1, t2);
			}

			if (/*adding_note*/ ctx[32]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_19(ctx);
					if_block1.c();
					if_block1.m(div1, null);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (!current || dirty[0] & /*my_notes*/ 8) {
				toggle_class(div1, "centered", /*my_notes*/ ctx[3].length <= 0);
			}

			let previous_block_index_1 = current_block_type_index_1;
			current_block_type_index_1 = select_block_type_28(ctx, dirty);

			if (current_block_type_index_1 === previous_block_index_1) {
				if_blocks_1[current_block_type_index_1].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks_1[previous_block_index_1], 1, 1, () => {
					if_blocks_1[previous_block_index_1] = null;
				});

				check_outros();
				if_block2 = if_blocks_1[current_block_type_index_1];

				if (!if_block2) {
					if_block2 = if_blocks_1[current_block_type_index_1] = if_block_creators_1[current_block_type_index_1](ctx);
					if_block2.c();
				} else {
					if_block2.p(ctx, dirty);
				}

				transition_in(if_block2, 1);
				if_block2.m(div5, null);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block0);
			transition_in(if_block2);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block0);
			transition_out(if_block2);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div5);
			if_blocks[current_block_type_index].d();
			if (if_block1) if_block1.d();
			if_blocks_1[current_block_type_index_1].d();
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_15.name,
		type: "if",
		source: "(1301:47) ",
		ctx
	});

	return block;
}

// (941:47) 
function create_if_block_4(ctx) {
	let div2;
	let div1;
	let div0;
	let span;
	let t1;
	let select;
	let t2;
	let button;
	let img;
	let img_src_value;
	let img_alt_value;
	let t3;
	let current_block_type_index;
	let if_block;
	let current;
	let mounted;
	let dispose;
	let each_value_4 = Object.keys(/*chatbot_models*/ ctx[34]);
	validate_each_argument(each_value_4);
	let each_blocks = [];

	for (let i = 0; i < each_value_4.length; i += 1) {
		each_blocks[i] = create_each_block_4(get_each_context_4(ctx, each_value_4, i));
	}

	const if_block_creators = [create_if_block_5, create_else_block_3];
	const if_blocks = [];

	function select_block_type_23(ctx, dirty) {
		if (!/*show_chatbot_settings*/ ctx[7]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type_23(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			div2 = element("div");
			div1 = element("div");
			div0 = element("div");
			span = element("span");
			span.textContent = "Model:";
			t1 = space();
			select = element("select");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t2 = space();
			button = element("button");
			img = element("img");
			t3 = space();
			if_block.c();
			add_location(span, file$1, 944, 32, 55614);
			if (/*selected_chatbot*/ ctx[8] === void 0) add_render_callback(() => /*select_change_handler*/ ctx[99].call(select));
			add_location(select, file$1, 945, 32, 55667);
			attr_dev(div0, "class", "row spaced centered");
			set_style(div0, "height", "auto");
			set_style(div0, "width", "100%");
			toggle_class(div0, "gone", /*show_chatbot_settings*/ ctx[7]);
			add_location(div0, file$1, 943, 28, 55478);
			attr_dev(img, "class", "action-icon");

			if (!src_url_equal(img.src, img_src_value = /*show_chatbot_settings*/ ctx[7]
			? "./logos/exit-svgrepo-com.svg"
			: "./logos/settings-svgrepo-com.svg")) attr_dev(img, "src", img_src_value);

			attr_dev(img, "alt", img_alt_value = /*show_chatbot_settings*/ ctx[7]
			? "Exit chatbot settings"
			: "Open chatbot settings");

			set_style(img, "width", "2.5rem");
			set_style(img, "height", "2.5rem");
			add_location(img, file$1, 957, 32, 56339);
			attr_dev(button, "class", "action-button");
			add_location(button, file$1, 953, 28, 56018);
			attr_dev(div1, "id", "chatbot-header");
			attr_dev(div1, "class", "padded row space-between svelte-qzsvuf");
			add_location(div1, file$1, 942, 24, 55391);
			attr_dev(div2, "id", "chatbot-tab-content");
			attr_dev(div2, "class", "column svelte-qzsvuf");
			add_location(div2, file$1, 941, 20, 55321);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div2, anchor);
			append_dev(div2, div1);
			append_dev(div1, div0);
			append_dev(div0, span);
			append_dev(div0, t1);
			append_dev(div0, select);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(select, null);
				}
			}

			select_option(select, /*selected_chatbot*/ ctx[8], true);
			append_dev(div1, t2);
			append_dev(div1, button);
			append_dev(button, img);
			append_dev(div2, t3);
			if_blocks[current_block_type_index].m(div2, null);
			current = true;

			if (!mounted) {
				dispose = [
					listen_dev(select, "change", /*select_change_handler*/ ctx[99]),
					listen_dev(button, "click", /*click_handler_45*/ ctx[100], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty[1] & /*chatbot_models*/ 8) {
				each_value_4 = Object.keys(/*chatbot_models*/ ctx[34]);
				validate_each_argument(each_value_4);
				let i;

				for (i = 0; i < each_value_4.length; i += 1) {
					const child_ctx = get_each_context_4(ctx, each_value_4, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_4(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(select, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_4.length;
			}

			if (dirty[0] & /*selected_chatbot*/ 256 | dirty[1] & /*chatbot_models*/ 8) {
				select_option(select, /*selected_chatbot*/ ctx[8]);
			}

			if (!current || dirty[0] & /*show_chatbot_settings*/ 128) {
				toggle_class(div0, "gone", /*show_chatbot_settings*/ ctx[7]);
			}

			if (!current || dirty[0] & /*show_chatbot_settings*/ 128 && !src_url_equal(img.src, img_src_value = /*show_chatbot_settings*/ ctx[7]
			? "./logos/exit-svgrepo-com.svg"
			: "./logos/settings-svgrepo-com.svg")) {
				attr_dev(img, "src", img_src_value);
			}

			if (!current || dirty[0] & /*show_chatbot_settings*/ 128 && img_alt_value !== (img_alt_value = /*show_chatbot_settings*/ ctx[7]
			? "Exit chatbot settings"
			: "Open chatbot settings")) {
				attr_dev(img, "alt", img_alt_value);
			}

			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type_23(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(div2, null);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div2);
			destroy_each(each_blocks, detaching);
			if_blocks[current_block_type_index].d();
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_4.name,
		type: "if",
		source: "(941:47) ",
		ctx
	});

	return block;
}

// (910:16) {#if active_right_tab===0}
function create_if_block$1(ctx) {
	let div2;
	let div0;
	let t;
	let div1;

	function select_block_type_22(ctx, dirty) {
		if (/*recording*/ ctx[6] && /*recording*/ ctx[6].video) return create_if_block_2$1;
		if (/*recording*/ ctx[6] && /*recording*/ ctx[6].audio) return create_if_block_3;
		return create_else_block;
	}

	let current_block_type = select_block_type_22(ctx);
	let if_block0 = current_block_type(ctx);
	let if_block1 = /*recording*/ ctx[6] && /*recording*/ ctx[6].transcript && create_if_block_1$1(ctx);

	const block = {
		c: function create() {
			div2 = element("div");
			div0 = element("div");
			if_block0.c();
			t = space();
			div1 = element("div");
			if (if_block1) if_block1.c();
			attr_dev(div0, "id", "media-player-area");
			attr_dev(div0, "class", "bordered svelte-qzsvuf");
			add_location(div0, file$1, 911, 24, 53056);
			attr_dev(div1, "id", "transcript-area");
			attr_dev(div1, "class", "column bordered spaced svelte-qzsvuf");
			add_location(div1, file$1, 924, 24, 54010);
			attr_dev(div2, "class", "column padded spaced");
			set_style(div2, "width", "100%");
			set_style(div2, "height", "100%");
			add_location(div2, file$1, 910, 20, 52962);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div2, anchor);
			append_dev(div2, div0);
			if_block0.m(div0, null);
			append_dev(div2, t);
			append_dev(div2, div1);
			if (if_block1) if_block1.m(div1, null);
		},
		p: function update(ctx, dirty) {
			if (current_block_type === (current_block_type = select_block_type_22(ctx)) && if_block0) {
				if_block0.p(ctx, dirty);
			} else {
				if_block0.d(1);
				if_block0 = current_block_type(ctx);

				if (if_block0) {
					if_block0.c();
					if_block0.m(div0, null);
				}
			}

			if (/*recording*/ ctx[6] && /*recording*/ ctx[6].transcript) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_1$1(ctx);
					if_block1.c();
					if_block1.m(div1, null);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div2);
			if_block0.d();
			if (if_block1) if_block1.d();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$1.name,
		type: "if",
		source: "(910:16) {#if active_right_tab===0}",
		ctx
	});

	return block;
}

// (1329:32) {:else}
function create_else_block_7(ctx) {
	let div;
	let span;

	const block = {
		c: function create() {
			div = element("div");
			span = element("span");
			span.textContent = "No notes added. Feel free to add a note.";
			add_location(span, file$1, 1330, 40, 85464);
			attr_dev(div, "class", "row padded space-between centered");
			add_location(div, file$1, 1329, 36, 85376);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, span);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_7.name,
		type: "else",
		source: "(1329:32) {:else}",
		ctx
	});

	return block;
}

// (1308:32) {#if my_notes.length > 0}
function create_if_block_20(ctx) {
	let each_1_anchor;
	let current;
	let each_value_7 = /*my_notes*/ ctx[3];
	validate_each_argument(each_value_7);
	let each_blocks = [];

	for (let i = 0; i < each_value_7.length; i += 1) {
		each_blocks[i] = create_each_block_7(get_each_context_7(ctx, each_value_7, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	const block = {
		c: function create() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		m: function mount(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(target, anchor);
				}
			}

			insert_dev(target, each_1_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*my_notes*/ 8 | dirty[1] & /*removeNote*/ 65536) {
				each_value_7 = /*my_notes*/ ctx[3];
				validate_each_argument(each_value_7);
				let i;

				for (i = 0; i < each_value_7.length; i += 1) {
					const child_ctx = get_each_context_7(ctx, each_value_7, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block_7(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				group_outros();

				for (i = each_value_7.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;

			for (let i = 0; i < each_value_7.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o: function outro(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d: function destroy(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(each_1_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_20.name,
		type: "if",
		source: "(1308:32) {#if my_notes.length > 0}",
		ctx
	});

	return block;
}

// (1309:36) {#each my_notes as note, i}
function create_each_block_7(ctx) {
	let div2;
	let div0;
	let sveltemarkdown;
	let t0;
	let div1;
	let button;
	let img;
	let img_src_value;
	let t1;
	let current;
	let mounted;
	let dispose;

	sveltemarkdown = new SvelteMarkdown({
			props: { source: /*note*/ ctx[161] },
			$$inline: true
		});

	function click_handler_59() {
		return /*click_handler_59*/ ctx[130](/*i*/ ctx[147], /*note*/ ctx[161]);
	}

	const block = {
		c: function create() {
			div2 = element("div");
			div0 = element("div");
			create_component(sveltemarkdown.$$.fragment);
			t0 = space();
			div1 = element("div");
			button = element("button");
			img = element("img");
			t1 = space();
			set_style(div0, "width", "95%");
			set_style(div0, "align-items", "flex-start");
			add_location(div0, file$1, 1310, 44, 83976);
			if (!src_url_equal(img.src, img_src_value = "./logos/delete-x-svgrepo-com.svg")) attr_dev(img, "src", img_src_value);
			attr_dev(img, "alt", "Delete note");
			attr_dev(img, "class", "mini-icon");
			add_location(img, file$1, 1323, 52, 85019);
			attr_dev(button, "class", "action-button");
			add_location(button, file$1, 1318, 48, 84607);
			attr_dev(div1, "class", "row spaced");
			set_style(div1, "width", "5%");
			set_style(div1, "align-items", "flex-start");
			add_location(div1, file$1, 1316, 44, 84409);
			attr_dev(div2, "class", "row padded bordered space-between");
			add_location(div2, file$1, 1309, 40, 83883);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div2, anchor);
			append_dev(div2, div0);
			mount_component(sveltemarkdown, div0, null);
			append_dev(div2, t0);
			append_dev(div2, div1);
			append_dev(div1, button);
			append_dev(button, img);
			append_dev(div2, t1);
			current = true;

			if (!mounted) {
				dispose = listen_dev(button, "click", click_handler_59, false, false, false, false);
				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			const sveltemarkdown_changes = {};
			if (dirty[0] & /*my_notes*/ 8) sveltemarkdown_changes.source = /*note*/ ctx[161];
			sveltemarkdown.$set(sveltemarkdown_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(sveltemarkdown.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(sveltemarkdown.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div2);
			destroy_component(sveltemarkdown);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_7.name,
		type: "each",
		source: "(1309:36) {#each my_notes as note, i}",
		ctx
	});

	return block;
}

// (1334:32) {#if adding_note}
function create_if_block_19(ctx) {
	let div1;
	let input;
	let t0;
	let div0;
	let button0;
	let img0;
	let img0_src_value;
	let t1;
	let button1;
	let img1;
	let img1_src_value;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			div1 = element("div");
			input = element("input");
			t0 = space();
			div0 = element("div");
			button0 = element("button");
			img0 = element("img");
			t1 = space();
			button1 = element("button");
			img1 = element("img");
			attr_dev(input, "class", "note-input svelte-qzsvuf");
			attr_dev(input, "type", "text");
			attr_dev(input, "placeholder", "Enter your note here");
			add_location(input, file$1, 1335, 40, 85810);
			if (!src_url_equal(img0.src, img0_src_value = "./logos/check-svgrepo-com.svg")) attr_dev(img0, "src", img0_src_value);
			attr_dev(img0, "alt", "Confirm adding note");
			attr_dev(img0, "class", "mini-icon");
			add_location(img0, file$1, 1343, 48, 86492);
			attr_dev(button0, "class", "action-button");
			add_location(button0, file$1, 1337, 44, 86017);
			if (!src_url_equal(img1.src, img1_src_value = "./logos/delete-x-svgrepo-com.svg")) attr_dev(img1, "src", img1_src_value);
			attr_dev(img1, "alt", "Cancel adding note");
			attr_dev(img1, "class", "mini-icon");
			add_location(img1, file$1, 1350, 48, 87083);
			attr_dev(button1, "class", "action-button");
			add_location(button1, file$1, 1345, 44, 86676);
			attr_dev(div0, "class", "row spaced");
			add_location(div0, file$1, 1336, 40, 85948);
			attr_dev(div1, "class", "row padded bordered space-between");
			set_style(div1, "width", "100%");
			set_style(div1, "height", "auto");
			add_location(div1, file$1, 1334, 36, 85688);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div1, anchor);
			append_dev(div1, input);
			set_input_value(input, /*temp_note*/ ctx[33]);
			append_dev(div1, t0);
			append_dev(div1, div0);
			append_dev(div0, button0);
			append_dev(button0, img0);
			append_dev(div0, t1);
			append_dev(div0, button1);
			append_dev(button1, img1);

			if (!mounted) {
				dispose = [
					listen_dev(input, "input", /*input_input_handler*/ ctx[131]),
					listen_dev(button0, "click", /*click_handler_60*/ ctx[132], false, false, false, false),
					listen_dev(button1, "click", /*click_handler_61*/ ctx[133], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty[1] & /*temp_note*/ 4 && input.value !== /*temp_note*/ ctx[33]) {
				set_input_value(input, /*temp_note*/ ctx[33]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div1);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_19.name,
		type: "if",
		source: "(1334:32) {#if adding_note}",
		ctx
	});

	return block;
}

// (1487:24) {:else}
function create_else_block_6(ctx) {
	let div1;
	let div0;
	let span;

	const block = {
		c: function create() {
			div1 = element("div");
			div0 = element("div");
			span = element("span");
			span.textContent = "No feedback notes added. Feel free to add notes on your feedback by clicking \"Add Note\" on any of the critical feedback.";
			add_location(span, file$1, 1489, 36, 98049);
			attr_dev(div0, "class", "row space-between centered");
			set_style(div0, "width", "100%");
			set_style(div0, "height", "auto");
			add_location(div0, file$1, 1488, 32, 97939);
			attr_dev(div1, "class", "column centered spaced padded");
			set_style(div1, "width", "100%");
			set_style(div1, "height", "auto");
			add_location(div1, file$1, 1487, 28, 97830);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div1, anchor);
			append_dev(div1, div0);
			append_dev(div0, span);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_6.name,
		type: "else",
		source: "(1487:24) {:else}",
		ctx
	});

	return block;
}

// (1389:24) {#if Object.keys(feedback_notes).length > 0}
function create_if_block_16(ctx) {
	let each_1_anchor;
	let current;
	let each_value_5 = Object.keys(/*feedback_notes*/ ctx[4]).map(Number).sort(func);
	validate_each_argument(each_value_5);
	let each_blocks = [];

	for (let i = 0; i < each_value_5.length; i += 1) {
		each_blocks[i] = create_each_block_5(get_each_context_5(ctx, each_value_5, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	const block = {
		c: function create() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		m: function mount(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(target, anchor);
				}
			}

			insert_dev(target, each_1_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*feedback_notes, feedback_list*/ 17 | dirty[1] & /*temp_note, confirmNote, removeNote*/ 196612) {
				each_value_5 = Object.keys(/*feedback_notes*/ ctx[4]).map(Number).sort(func);
				validate_each_argument(each_value_5);
				let i;

				for (i = 0; i < each_value_5.length; i += 1) {
					const child_ctx = get_each_context_5(ctx, each_value_5, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block_5(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				group_outros();

				for (i = each_value_5.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;

			for (let i = 0; i < each_value_5.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o: function outro(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d: function destroy(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(each_1_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_16.name,
		type: "if",
		source: "(1389:24) {#if Object.keys(feedback_notes).length > 0}",
		ctx
	});

	return block;
}

// (1432:40) {:else}
function create_else_block_5(ctx) {
	let div;
	let span;

	const block = {
		c: function create() {
			div = element("div");
			span = element("span");
			span.textContent = "No notes added. Feel free to add a note.";
			add_location(span, file$1, 1433, 48, 93481);
			attr_dev(div, "class", "row padded centered space-between");
			add_location(div, file$1, 1432, 44, 93385);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, span);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_5.name,
		type: "else",
		source: "(1432:40) {:else}",
		ctx
	});

	return block;
}

// (1413:40) {#if feedback_notes[key].notes.length > 0}
function create_if_block_18(ctx) {
	let each_1_anchor;
	let current;
	let each_value_6 = /*feedback_notes*/ ctx[4][/*key*/ ctx[158]].notes;
	validate_each_argument(each_value_6);
	let each_blocks = [];

	for (let i = 0; i < each_value_6.length; i += 1) {
		each_blocks[i] = create_each_block_6(get_each_context_6(ctx, each_value_6, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	const block = {
		c: function create() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		m: function mount(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(target, anchor);
				}
			}

			insert_dev(target, each_1_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*feedback_notes*/ 16 | dirty[1] & /*removeNote*/ 65536) {
				each_value_6 = /*feedback_notes*/ ctx[4][/*key*/ ctx[158]].notes;
				validate_each_argument(each_value_6);
				let i;

				for (i = 0; i < each_value_6.length; i += 1) {
					const child_ctx = get_each_context_6(ctx, each_value_6, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block_6(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				group_outros();

				for (i = each_value_6.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;

			for (let i = 0; i < each_value_6.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o: function outro(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d: function destroy(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(each_1_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_18.name,
		type: "if",
		source: "(1413:40) {#if feedback_notes[key].notes.length > 0}",
		ctx
	});

	return block;
}

// (1414:44) {#each feedback_notes[key].notes as note, i}
function create_each_block_6(ctx) {
	let div2;
	let div0;
	let sveltemarkdown;
	let t0;
	let div1;
	let button;
	let img;
	let img_src_value;
	let img_alt_value;
	let t1;
	let current;
	let mounted;
	let dispose;

	sveltemarkdown = new SvelteMarkdown({
			props: { source: /*note*/ ctx[161] },
			$$inline: true
		});

	function click_handler_65() {
		return /*click_handler_65*/ ctx[137](/*i*/ ctx[147], /*key*/ ctx[158], /*note*/ ctx[161]);
	}

	const block = {
		c: function create() {
			div2 = element("div");
			div0 = element("div");
			create_component(sveltemarkdown.$$.fragment);
			t0 = space();
			div1 = element("div");
			button = element("button");
			img = element("img");
			t1 = space();
			set_style(div0, "width", "95%");
			set_style(div0, "align-items", "flex-start");
			add_location(div0, file$1, 1416, 52, 91972);
			if (!src_url_equal(img.src, img_src_value = "./logos/delete-x-svgrepo-com.svg")) attr_dev(img, "src", img_src_value);
			attr_dev(img, "alt", img_alt_value = "Delete note from Feedback ID" + /*key*/ ctx[158]);
			attr_dev(img, "class", "mini-icon");
			add_location(img, file$1, 1426, 60, 92958);
			attr_dev(button, "class", "action-button");
			add_location(button, file$1, 1421, 56, 92466);
			attr_dev(div1, "class", "row space-between");
			set_style(div1, "width", "5%");
			set_style(div1, "align-items", "flex-start");
			add_location(div1, file$1, 1419, 52, 92223);
			attr_dev(div2, "class", "row padded bordered space-between");
			add_location(div2, file$1, 1414, 48, 91776);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div2, anchor);
			append_dev(div2, div0);
			mount_component(sveltemarkdown, div0, null);
			append_dev(div2, t0);
			append_dev(div2, div1);
			append_dev(div1, button);
			append_dev(button, img);
			append_dev(div2, t1);
			current = true;

			if (!mounted) {
				dispose = listen_dev(button, "click", click_handler_65, false, false, false, false);
				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			const sveltemarkdown_changes = {};
			if (dirty[0] & /*feedback_notes*/ 16) sveltemarkdown_changes.source = /*note*/ ctx[161];
			sveltemarkdown.$set(sveltemarkdown_changes);

			if (!current || dirty[0] & /*feedback_notes*/ 16 && img_alt_value !== (img_alt_value = "Delete note from Feedback ID" + /*key*/ ctx[158])) {
				attr_dev(img, "alt", img_alt_value);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(sveltemarkdown.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(sveltemarkdown.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div2);
			destroy_component(sveltemarkdown);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_6.name,
		type: "each",
		source: "(1414:44) {#each feedback_notes[key].notes as note, i}",
		ctx
	});

	return block;
}

// (1437:40) {#if feedback_notes[key].is_adding}
function create_if_block_17(ctx) {
	let div1;
	let input;
	let t0;
	let div0;
	let button0;
	let img0;
	let img0_src_value;
	let t1;
	let button1;
	let img1;
	let img1_src_value;
	let mounted;
	let dispose;

	function click_handler_66() {
		return /*click_handler_66*/ ctx[139](/*key*/ ctx[158]);
	}

	function click_handler_67() {
		return /*click_handler_67*/ ctx[140](/*key*/ ctx[158]);
	}

	const block = {
		c: function create() {
			div1 = element("div");
			input = element("input");
			t0 = space();
			div0 = element("div");
			button0 = element("button");
			img0 = element("img");
			t1 = space();
			button1 = element("button");
			img1 = element("img");
			attr_dev(input, "class", "note-input svelte-qzsvuf");
			attr_dev(input, "type", "text");
			attr_dev(input, "placeholder", "Enter your note here");
			add_location(input, file$1, 1438, 48, 93888);
			if (!src_url_equal(img0.src, img0_src_value = "./logos/check-svgrepo-com.svg")) attr_dev(img0, "src", img0_src_value);
			attr_dev(img0, "alt", "Confirm adding note");
			attr_dev(img0, "class", "mini-icon");
			add_location(img0, file$1, 1446, 56, 94676);
			attr_dev(button0, "class", "action-button");
			add_location(button0, file$1, 1440, 52, 94112);
			if (!src_url_equal(img1.src, img1_src_value = "./logos/delete-x-svgrepo-com.svg")) attr_dev(img1, "src", img1_src_value);
			attr_dev(img1, "alt", "Cancel adding note");
			attr_dev(img1, "class", "mini-icon");
			add_location(img1, file$1, 1453, 56, 95348);
			attr_dev(button1, "class", "action-button");
			add_location(button1, file$1, 1448, 52, 94876);
			attr_dev(div0, "class", "row spaced");
			add_location(div0, file$1, 1439, 48, 94035);
			attr_dev(div1, "class", "row padded bordered space-between");
			set_style(div1, "width", "100%");
			set_style(div1, "height", "auto");
			add_location(div1, file$1, 1437, 44, 93758);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div1, anchor);
			append_dev(div1, input);
			set_input_value(input, /*temp_note*/ ctx[33]);
			append_dev(div1, t0);
			append_dev(div1, div0);
			append_dev(div0, button0);
			append_dev(button0, img0);
			append_dev(div0, t1);
			append_dev(div0, button1);
			append_dev(button1, img1);

			if (!mounted) {
				dispose = [
					listen_dev(input, "input", /*input_input_handler_1*/ ctx[138]),
					listen_dev(button0, "click", click_handler_66, false, false, false, false),
					listen_dev(button1, "click", click_handler_67, false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty[1] & /*temp_note*/ 4 && input.value !== /*temp_note*/ ctx[33]) {
				set_input_value(input, /*temp_note*/ ctx[33]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div1);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_17.name,
		type: "if",
		source: "(1437:40) {#if feedback_notes[key].is_adding}",
		ctx
	});

	return block;
}

// (1390:28) {#each Object.keys(feedback_notes).map(Number).sort((a, b) => a - b) as key}
function create_each_block_5(ctx) {
	let div3;
	let div0;
	let span;
	let strong;
	let t0;
	let t1_value = /*key*/ ctx[158] + "";
	let t1;
	let t2;
	let t3;
	let t4_value = /*feedback_list*/ ctx[0][/*key*/ ctx[158] - 1].quote.slice(0, 70) + "";
	let t4;
	let t5;
	let t6;
	let button0;
	let img0;
	let img0_src_value;
	let t7;
	let div1;
	let current_block_type_index;
	let if_block0;
	let t8;
	let t9;
	let div2;
	let button1;
	let img1;
	let img1_src_value;
	let t10;
	let t11;
	let button2;
	let img2;
	let img2_src_value;
	let t12;
	let t13;
	let div3_id_value;
	let current;
	let mounted;
	let dispose;

	function click_handler_64() {
		return /*click_handler_64*/ ctx[136](/*key*/ ctx[158]);
	}

	const if_block_creators = [create_if_block_18, create_else_block_5];
	const if_blocks = [];

	function select_block_type_29(ctx, dirty) {
		if (/*feedback_notes*/ ctx[4][/*key*/ ctx[158]].notes.length > 0) return 0;
		return 1;
	}

	current_block_type_index = select_block_type_29(ctx);
	if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	let if_block1 = /*feedback_notes*/ ctx[4][/*key*/ ctx[158]].is_adding && create_if_block_17(ctx);

	function click_handler_68() {
		return /*click_handler_68*/ ctx[141](/*key*/ ctx[158]);
	}

	function click_handler_69() {
		return /*click_handler_69*/ ctx[142](/*key*/ ctx[158]);
	}

	const block = {
		c: function create() {
			div3 = element("div");
			div0 = element("div");
			span = element("span");
			strong = element("strong");
			t0 = text("Feedback #");
			t1 = text(t1_value);
			t2 = text(" Notes:");
			t3 = space();
			t4 = text(t4_value);
			t5 = text("...");
			t6 = space();
			button0 = element("button");
			img0 = element("img");
			t7 = space();
			div1 = element("div");
			if_block0.c();
			t8 = space();
			if (if_block1) if_block1.c();
			t9 = space();
			div2 = element("div");
			button1 = element("button");
			img1 = element("img");
			t10 = text("\n                                            Add Note");
			t11 = space();
			button2 = element("button");
			img2 = element("img");
			t12 = text("\n                                            Delete all");
			t13 = space();
			add_location(strong, file$1, 1392, 47, 89843);
			add_location(span, file$1, 1392, 40, 89836);
			if (!src_url_equal(img0.src, img0_src_value = "./logos/delete-x-svgrepo-com.svg")) attr_dev(img0, "src", img0_src_value);
			attr_dev(img0, "alt", "Remove feedback notes section");
			attr_dev(img0, "class", "mini-icon");
			add_location(img0, file$1, 1407, 44, 91173);
			attr_dev(button0, "class", "action-button");
			add_location(button0, file$1, 1393, 40, 89977);
			attr_dev(div0, "class", "row space-between");
			set_style(div0, "width", "100%");
			set_style(div0, "height", "auto");
			add_location(div0, file$1, 1391, 36, 89731);
			attr_dev(div1, "class", "column bordered");
			set_style(div1, "width", "100%");
			set_style(div1, "height", "auto");
			toggle_class(div1, "centered", /*feedback_notes*/ ctx[4][/*key*/ ctx[158]].notes.length <= 0);
			add_location(div1, file$1, 1410, 36, 91401);
			if (!src_url_equal(img1.src, img1_src_value = "./logos/note-svgrepo-com.svg")) attr_dev(img1, "src", img1_src_value);
			attr_dev(img1, "alt", "Add Note");
			attr_dev(img1, "class", "action-icon");
			add_location(img1, file$1, 1466, 44, 96296);
			attr_dev(button1, "class", "action-button centered column");
			add_location(button1, file$1, 1460, 40, 95803);
			if (!src_url_equal(img2.src, img2_src_value = "./logos/delete-svgrepo-com.svg")) attr_dev(img2, "src", img2_src_value);
			attr_dev(img2, "alt", "Delete all notes");
			attr_dev(img2, "class", "action-icon");
			add_location(img2, file$1, 1480, 44, 97459);
			attr_dev(button2, "class", "action-button centered column");
			add_location(button2, file$1, 1469, 40, 96515);
			attr_dev(div2, "class", "row centered spaced");
			add_location(div2, file$1, 1459, 36, 95729);
			attr_dev(div3, "id", div3_id_value = "feedback-note-section-" + /*key*/ ctx[158]);
			attr_dev(div3, "class", "column centered spaced padded svelte-qzsvuf");
			set_style(div3, "width", "100%");
			set_style(div3, "height", "auto");
			add_location(div3, file$1, 1390, 32, 89584);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div3, anchor);
			append_dev(div3, div0);
			append_dev(div0, span);
			append_dev(span, strong);
			append_dev(strong, t0);
			append_dev(strong, t1);
			append_dev(strong, t2);
			append_dev(span, t3);
			append_dev(span, t4);
			append_dev(span, t5);
			append_dev(div0, t6);
			append_dev(div0, button0);
			append_dev(button0, img0);
			append_dev(div3, t7);
			append_dev(div3, div1);
			if_blocks[current_block_type_index].m(div1, null);
			append_dev(div1, t8);
			if (if_block1) if_block1.m(div1, null);
			append_dev(div3, t9);
			append_dev(div3, div2);
			append_dev(div2, button1);
			append_dev(button1, img1);
			append_dev(button1, t10);
			append_dev(div2, t11);
			append_dev(div2, button2);
			append_dev(button2, img2);
			append_dev(button2, t12);
			append_dev(div3, t13);
			current = true;

			if (!mounted) {
				dispose = [
					listen_dev(button0, "click", click_handler_64, false, false, false, false),
					listen_dev(button1, "click", click_handler_68, false, false, false, false),
					listen_dev(button2, "click", click_handler_69, false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			if ((!current || dirty[0] & /*feedback_notes*/ 16) && t1_value !== (t1_value = /*key*/ ctx[158] + "")) set_data_dev(t1, t1_value);
			if ((!current || dirty[0] & /*feedback_list, feedback_notes*/ 17) && t4_value !== (t4_value = /*feedback_list*/ ctx[0][/*key*/ ctx[158] - 1].quote.slice(0, 70) + "")) set_data_dev(t4, t4_value);
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type_29(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block0 = if_blocks[current_block_type_index];

				if (!if_block0) {
					if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block0.c();
				} else {
					if_block0.p(ctx, dirty);
				}

				transition_in(if_block0, 1);
				if_block0.m(div1, t8);
			}

			if (/*feedback_notes*/ ctx[4][/*key*/ ctx[158]].is_adding) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_17(ctx);
					if_block1.c();
					if_block1.m(div1, null);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (!current || dirty[0] & /*feedback_notes*/ 16) {
				toggle_class(div1, "centered", /*feedback_notes*/ ctx[4][/*key*/ ctx[158]].notes.length <= 0);
			}

			if (!current || dirty[0] & /*feedback_notes*/ 16 && div3_id_value !== (div3_id_value = "feedback-note-section-" + /*key*/ ctx[158])) {
				attr_dev(div3, "id", div3_id_value);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block0);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block0);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div3);
			if_blocks[current_block_type_index].d();
			if (if_block1) if_block1.d();
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_5.name,
		type: "each",
		source: "(1390:28) {#each Object.keys(feedback_notes).map(Number).sort((a, b) => a - b) as key}",
		ctx
	});

	return block;
}

// (947:36) {#each Object.keys(chatbot_models) as model}
function create_each_block_4(ctx) {
	let option;
	let t_value = /*model*/ ctx[153] + "";
	let t;

	const block = {
		c: function create() {
			option = element("option");
			t = text(t_value);
			option.__value = /*model*/ ctx[153];
			option.value = option.__value;
			add_location(option, file$1, 947, 40, 55828);
		},
		m: function mount(target, anchor) {
			insert_dev(target, option, anchor);
			append_dev(option, t);
		},
		p: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(option);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_4.name,
		type: "each",
		source: "(947:36) {#each Object.keys(chatbot_models) as model}",
		ctx
	});

	return block;
}

// (1197:24) {:else}
function create_else_block_3(ctx) {
	let div8;
	let div3;
	let span0;
	let strong0;
	let t1;
	let div0;
	let span1;
	let t3;
	let select;
	let t4;
	let div1;
	let span2;
	let t6;
	let range0;
	let updating_value;
	let t7;
	let div2;
	let span3;
	let t9;
	let range1;
	let updating_value_1;
	let t10;
	let div7;
	let span4;
	let strong1;
	let t12;
	let div5;
	let div4;
	let loadingbar;
	let updating_progress;
	let updating_status;
	let t13;
	let t14;
	let div6;
	let input;
	let t15;
	let button0;
	let img0;
	let img0_src_value;
	let t16;
	let t17;
	let button1;
	let img1;
	let img1_src_value;
	let t18;
	let current;
	let mounted;
	let dispose;
	let each_value_3 = Object.keys(/*chatbot_models*/ ctx[34]);
	validate_each_argument(each_value_3);
	let each_blocks = [];

	for (let i = 0; i < each_value_3.length; i += 1) {
		each_blocks[i] = create_each_block_3(get_each_context_3(ctx, each_value_3, i));
	}

	function range0_value_binding(value) {
		/*range0_value_binding*/ ctx[121](value);
	}

	let range0_props = { min: "0.0", max: "2.0", step: "0.1" };

	if (/*chatbot_temperature*/ ctx[9] !== void 0) {
		range0_props.value = /*chatbot_temperature*/ ctx[9];
	}

	range0 = new Range({ props: range0_props, $$inline: true });
	binding_callbacks.push(() => bind(range0, 'value', range0_value_binding));

	function range1_value_binding(value) {
		/*range1_value_binding*/ ctx[122](value);
	}

	let range1_props = { min: "10.0", max: "4095.0", step: "1.0" };

	if (/*chatbot_max_output_tokens*/ ctx[10] !== void 0) {
		range1_props.value = /*chatbot_max_output_tokens*/ ctx[10];
	}

	range1 = new Range({ props: range1_props, $$inline: true });
	binding_callbacks.push(() => bind(range1, 'value', range1_value_binding));

	function loadingbar_progress_binding_1(value) {
		/*loadingbar_progress_binding_1*/ ctx[123](value);
	}

	function loadingbar_status_binding_1(value) {
		/*loadingbar_status_binding_1*/ ctx[124](value);
	}

	let loadingbar_props = {};

	if (/*document_load_progress*/ ctx[28] !== void 0) {
		loadingbar_props.progress = /*document_load_progress*/ ctx[28];
	}

	if (/*document_load_status*/ ctx[27] !== void 0) {
		loadingbar_props.status = /*document_load_status*/ ctx[27];
	}

	loadingbar = new LoadingBar({ props: loadingbar_props, $$inline: true });
	binding_callbacks.push(() => bind(loadingbar, 'progress', loadingbar_progress_binding_1));
	binding_callbacks.push(() => bind(loadingbar, 'status', loadingbar_status_binding_1));

	function select_block_type_26(ctx, dirty) {
		if (/*documents*/ ctx[1].length > 0) return create_if_block_14;
		return create_else_block_4;
	}

	let current_block_type = select_block_type_26(ctx);
	let if_block = current_block_type(ctx);

	const block = {
		c: function create() {
			div8 = element("div");
			div3 = element("div");
			span0 = element("span");
			strong0 = element("strong");
			strong0.textContent = "Configurations";
			t1 = space();
			div0 = element("div");
			span1 = element("span");
			span1.textContent = "Model:";
			t3 = space();
			select = element("select");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t4 = space();
			div1 = element("div");
			span2 = element("span");
			span2.textContent = "Temperature:";
			t6 = space();
			create_component(range0.$$.fragment);
			t7 = space();
			div2 = element("div");
			span3 = element("span");
			span3.textContent = "Max Output Tokens:";
			t9 = space();
			create_component(range1.$$.fragment);
			t10 = space();
			div7 = element("div");
			span4 = element("span");
			strong1 = element("strong");
			strong1.textContent = "Chatbot's Documents";
			t12 = space();
			div5 = element("div");
			div4 = element("div");
			create_component(loadingbar.$$.fragment);
			t13 = space();
			if_block.c();
			t14 = space();
			div6 = element("div");
			input = element("input");
			t15 = space();
			button0 = element("button");
			img0 = element("img");
			t16 = text("\n                                            Add Document");
			t17 = space();
			button1 = element("button");
			img1 = element("img");
			t18 = text("\n                                            Remove All");
			add_location(strong0, file$1, 1199, 43, 75569);
			add_location(span0, file$1, 1199, 36, 75562);
			add_location(span1, file$1, 1201, 40, 75756);
			if (/*selected_chatbot*/ ctx[8] === void 0) add_render_callback(() => /*select_change_handler_1*/ ctx[120].call(select));
			add_location(select, file$1, 1202, 40, 75817);
			attr_dev(div0, "class", "row spaced centered");
			set_style(div0, "height", "auto");
			set_style(div0, "width", "100%");
			add_location(div0, file$1, 1200, 36, 75647);
			add_location(span2, file$1, 1209, 40, 76314);
			attr_dev(div1, "class", "row spaced");
			set_style(div1, "height", "auto");
			set_style(div1, "width", "100%");
			add_location(div1, file$1, 1208, 36, 76214);
			add_location(span3, file$1, 1213, 40, 76628);
			attr_dev(div2, "class", "row spaced");
			set_style(div2, "height", "auto");
			set_style(div2, "width", "100%");
			add_location(div2, file$1, 1212, 36, 76528);
			attr_dev(div3, "id", "chatbot-configurations");
			attr_dev(div3, "class", "column centered spaced padded bordered svelte-qzsvuf");
			add_location(div3, file$1, 1198, 32, 75445);
			add_location(strong1, file$1, 1219, 43, 77014);
			add_location(span4, file$1, 1219, 36, 77007);
			attr_dev(div4, "class", "overlay centered padded");
			toggle_class(div4, "invisible", /*is_document_loading*/ ctx[29] === false);
			add_location(div4, file$1, 1222, 40, 77266);
			attr_dev(div5, "id", "chatbot-rag-sources");
			attr_dev(div5, "class", "column centered spaced padded bordered");
			set_style(div5, "width", "100%");
			set_style(div5, "height", "auto");
			set_style(div5, "overflow-y", "auto");
			add_location(div5, file$1, 1221, 36, 77098);
			attr_dev(input, "type", "file");
			attr_dev(input, "id", "document_file_input");
			attr_dev(input, "class", "gone");
			add_location(input, file$1, 1255, 40, 79927);
			if (!src_url_equal(img0.src, img0_src_value = "./logos/add-ellipse-svgrepo-com.svg")) attr_dev(img0, "src", img0_src_value);
			attr_dev(img0, "alt", "Add document");
			attr_dev(img0, "class", "action-icon");
			add_location(img0, file$1, 1274, 44, 81475);
			button0.disabled = /*is_document_loading*/ ctx[29];
			attr_dev(button0, "class", "centered spaced column action-button");
			add_location(button0, file$1, 1263, 40, 80549);
			if (!src_url_equal(img1.src, img1_src_value = "./logos/delete-svgrepo-com.svg")) attr_dev(img1, "src", img1_src_value);
			attr_dev(img1, "alt", "Remove all documents");
			attr_dev(img1, "class", "action-icon");
			add_location(img1, file$1, 1290, 44, 82730);
			button1.disabled = /*is_document_loading*/ ctx[29];
			attr_dev(button1, "class", "centered spaced column action-button");
			add_location(button1, file$1, 1277, 40, 81709);
			attr_dev(div6, "id", "chatbot-rag-buttons");
			attr_dev(div6, "class", "row centered padded spaced");
			set_style(div6, "width", "100%");
			set_style(div6, "height", "auto");
			add_location(div6, file$1, 1254, 36, 79786);
			attr_dev(div7, "id", "chatbot-rag-panel");
			attr_dev(div7, "class", "column centered spaced padded bordered svelte-qzsvuf");
			add_location(div7, file$1, 1218, 32, 76894);
			attr_dev(div8, "id", "chatbot-settings");
			attr_dev(div8, "class", "column padded spaced");
			set_style(div8, "width", "100%");
			set_style(div8, "height", "95%");
			add_location(div8, file$1, 1197, 28, 75322);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div8, anchor);
			append_dev(div8, div3);
			append_dev(div3, span0);
			append_dev(span0, strong0);
			append_dev(div3, t1);
			append_dev(div3, div0);
			append_dev(div0, span1);
			append_dev(div0, t3);
			append_dev(div0, select);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(select, null);
				}
			}

			select_option(select, /*selected_chatbot*/ ctx[8], true);
			append_dev(div3, t4);
			append_dev(div3, div1);
			append_dev(div1, span2);
			append_dev(div1, t6);
			mount_component(range0, div1, null);
			append_dev(div3, t7);
			append_dev(div3, div2);
			append_dev(div2, span3);
			append_dev(div2, t9);
			mount_component(range1, div2, null);
			append_dev(div8, t10);
			append_dev(div8, div7);
			append_dev(div7, span4);
			append_dev(span4, strong1);
			append_dev(div7, t12);
			append_dev(div7, div5);
			append_dev(div5, div4);
			mount_component(loadingbar, div4, null);
			append_dev(div5, t13);
			if_block.m(div5, null);
			append_dev(div7, t14);
			append_dev(div7, div6);
			append_dev(div6, input);
			/*input_binding*/ ctx[126](input);
			append_dev(div6, t15);
			append_dev(div6, button0);
			append_dev(button0, img0);
			append_dev(button0, t16);
			append_dev(div6, t17);
			append_dev(div6, button1);
			append_dev(button1, img1);
			append_dev(button1, t18);
			current = true;

			if (!mounted) {
				dispose = [
					listen_dev(select, "change", /*select_change_handler_1*/ ctx[120]),
					listen_dev(input, "change", /*change_handler_1*/ ctx[127], false, false, false, false),
					listen_dev(button0, "click", /*click_handler_57*/ ctx[128], false, false, false, false),
					listen_dev(button1, "click", /*click_handler_58*/ ctx[129], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty[1] & /*chatbot_models*/ 8) {
				each_value_3 = Object.keys(/*chatbot_models*/ ctx[34]);
				validate_each_argument(each_value_3);
				let i;

				for (i = 0; i < each_value_3.length; i += 1) {
					const child_ctx = get_each_context_3(ctx, each_value_3, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_3(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(select, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_3.length;
			}

			if (dirty[0] & /*selected_chatbot*/ 256 | dirty[1] & /*chatbot_models*/ 8) {
				select_option(select, /*selected_chatbot*/ ctx[8]);
			}

			const range0_changes = {};

			if (!updating_value && dirty[0] & /*chatbot_temperature*/ 512) {
				updating_value = true;
				range0_changes.value = /*chatbot_temperature*/ ctx[9];
				add_flush_callback(() => updating_value = false);
			}

			range0.$set(range0_changes);
			const range1_changes = {};

			if (!updating_value_1 && dirty[0] & /*chatbot_max_output_tokens*/ 1024) {
				updating_value_1 = true;
				range1_changes.value = /*chatbot_max_output_tokens*/ ctx[10];
				add_flush_callback(() => updating_value_1 = false);
			}

			range1.$set(range1_changes);
			const loadingbar_changes = {};

			if (!updating_progress && dirty[0] & /*document_load_progress*/ 268435456) {
				updating_progress = true;
				loadingbar_changes.progress = /*document_load_progress*/ ctx[28];
				add_flush_callback(() => updating_progress = false);
			}

			if (!updating_status && dirty[0] & /*document_load_status*/ 134217728) {
				updating_status = true;
				loadingbar_changes.status = /*document_load_status*/ ctx[27];
				add_flush_callback(() => updating_status = false);
			}

			loadingbar.$set(loadingbar_changes);

			if (!current || dirty[0] & /*is_document_loading*/ 536870912) {
				toggle_class(div4, "invisible", /*is_document_loading*/ ctx[29] === false);
			}

			if (current_block_type === (current_block_type = select_block_type_26(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(div5, null);
				}
			}

			if (!current || dirty[0] & /*is_document_loading*/ 536870912) {
				prop_dev(button0, "disabled", /*is_document_loading*/ ctx[29]);
			}

			if (!current || dirty[0] & /*is_document_loading*/ 536870912) {
				prop_dev(button1, "disabled", /*is_document_loading*/ ctx[29]);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(range0.$$.fragment, local);
			transition_in(range1.$$.fragment, local);
			transition_in(loadingbar.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(range0.$$.fragment, local);
			transition_out(range1.$$.fragment, local);
			transition_out(loadingbar.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div8);
			destroy_each(each_blocks, detaching);
			destroy_component(range0);
			destroy_component(range1);
			destroy_component(loadingbar);
			if_block.d();
			/*input_binding*/ ctx[126](null);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_3.name,
		type: "else",
		source: "(1197:24) {:else}",
		ctx
	});

	return block;
}

// (965:24) {#if !show_chatbot_settings}
function create_if_block_5(ctx) {
	let div3;
	let div0;
	let p0;
	let strong0;
	let t1;
	let t2;
	let t3;
	let div1;
	let p1;
	let strong1;
	let t5;
	let loadingbar;
	let updating_progress;
	let updating_status;
	let t6;
	let div2;
	let t7;
	let div13;
	let div10;
	let div4;
	let span0;
	let strong2;
	let t9;
	let div4_style_value;
	let t10;
	let div7;
	let span1;
	let strong3;
	let t12;
	let div5;
	let t14;
	let div6;
	let div7_style_value;
	let t16;
	let div8;
	let span2;
	let strong4;
	let t18;
	let label0;
	let input0;
	let t19;
	let t20;
	let label1;
	let input1;
	let t21;
	let div8_style_value;
	let t22;
	let div9;
	let div9_style_value;
	let t23;
	let div12;
	let div11;
	let label2;
	let t24;
	let input2;
	let t25;
	let button0;
	let img0;
	let img0_src_value;
	let t26;
	let textarea;
	let t27;
	let button1;
	let img1;
	let img1_src_value;
	let current;
	let mounted;
	let dispose;
	let each_value_1 = /*chatbot_messages*/ ctx[2];
	validate_each_argument(each_value_1);
	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	function loadingbar_progress_binding(value) {
		/*loadingbar_progress_binding*/ ctx[105](value);
	}

	function loadingbar_status_binding(value) {
		/*loadingbar_status_binding*/ ctx[106](value);
	}

	let loadingbar_props = {};

	if (/*chatbot_load_progress*/ ctx[26] !== void 0) {
		loadingbar_props.progress = /*chatbot_load_progress*/ ctx[26];
	}

	if (/*chatbot_load_status*/ ctx[25] !== void 0) {
		loadingbar_props.status = /*chatbot_load_status*/ ctx[25];
	}

	loadingbar = new LoadingBar({ props: loadingbar_props, $$inline: true });
	binding_callbacks.push(() => bind(loadingbar, 'progress', loadingbar_progress_binding));
	binding_callbacks.push(() => bind(loadingbar, 'status', loadingbar_status_binding));

	function select_block_type_24(ctx, dirty) {
		if (/*context*/ ctx[18]) return create_if_block_7;
		return create_else_block_2;
	}

	let current_block_type = select_block_type_24(ctx);
	let if_block0 = current_block_type(ctx);

	function select_block_type_25(ctx, dirty) {
		if (/*image_url*/ ctx[20]) return create_if_block_6;
		return create_else_block_1;
	}

	let current_block_type_1 = select_block_type_25(ctx);
	let if_block1 = current_block_type_1(ctx);

	const block = {
		c: function create() {
			div3 = element("div");
			div0 = element("div");
			p0 = element("p");
			strong0 = element("strong");
			strong0.textContent = "assistant:";
			t1 = text(" Hello! How can I help you today?");
			t2 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t3 = space();
			div1 = element("div");
			p1 = element("p");
			strong1 = element("strong");
			strong1.textContent = "assistant:";
			t5 = space();
			create_component(loadingbar.$$.fragment);
			t6 = space();
			div2 = element("div");
			t7 = space();
			div13 = element("div");
			div10 = element("div");
			div4 = element("div");
			span0 = element("span");
			strong2 = element("strong");
			strong2.textContent = "Feedback Context:";
			t9 = space();
			if_block0.c();
			t10 = space();
			div7 = element("div");
			span1 = element("span");
			strong3 = element("strong");
			strong3.textContent = "Suggested messages:";
			t12 = space();
			div5 = element("div");
			div5.textContent = "Explain feedback.";
			t14 = space();
			div6 = element("div");
			div6.textContent = "Brainstorm actions.";
			t16 = space();
			div8 = element("div");
			span2 = element("span");
			strong4 = element("strong");
			strong4.textContent = "Refer to:";
			t18 = space();
			label0 = element("label");
			input0 = element("input");
			t19 = text(" Transcript");
			t20 = space();
			label1 = element("label");
			input1 = element("input");
			t21 = text(" Documents");
			t22 = space();
			div9 = element("div");
			if_block1.c();
			t23 = space();
			div12 = element("div");
			div11 = element("div");
			label2 = element("label");
			t24 = space();
			input2 = element("input");
			t25 = space();
			button0 = element("button");
			img0 = element("img");
			t26 = space();
			textarea = element("textarea");
			t27 = space();
			button1 = element("button");
			img1 = element("img");
			add_location(strong0, file$1, 967, 40, 57001);
			add_location(p0, file$1, 967, 36, 56997);
			attr_dev(div0, "class", "assistant padded svelte-qzsvuf");
			add_location(div0, file$1, 966, 32, 56930);
			add_location(strong1, file$1, 1081, 40, 66415);
			add_location(p1, file$1, 1081, 36, 66411);
			attr_dev(div1, "class", "assistant padded column svelte-qzsvuf");
			toggle_class(div1, "invisible", /*is_loading*/ ctx[24] === false);
			add_location(div1, file$1, 1080, 32, 66300);
			set_style(div2, "height", "20%");
			set_style(div2, "width", "100%");
			set_style(div2, "background-color", "white");
			set_style(div2, "color", "white");
			set_style(div2, "cursor", "default");
			add_location(div2, file$1, 1084, 32, 66645);
			attr_dev(div3, "id", "chatbot-messages");
			attr_dev(div3, "class", "column spaced bordered padded svelte-qzsvuf");
			add_location(div3, file$1, 965, 28, 56832);
			add_location(strong2, file$1, 1090, 46, 67148);
			add_location(span0, file$1, 1090, 40, 67142);
			attr_dev(div4, "id", "contexts");
			attr_dev(div4, "class", "column centered bordered svelte-qzsvuf");
			attr_dev(div4, "style", div4_style_value = /*image_url*/ ctx[20] ? "width:25%;" : "width:33%;");
			add_location(div4, file$1, 1089, 36, 67001);
			add_location(strong3, file$1, 1107, 46, 68499);
			add_location(span1, file$1, 1107, 40, 68493);
			attr_dev(div5, "class", "suggested-message svelte-qzsvuf");
			add_location(div5, file$1, 1108, 40, 68583);
			attr_dev(div6, "class", "suggested-message svelte-qzsvuf");
			add_location(div6, file$1, 1117, 40, 69199);
			attr_dev(div7, "id", "suggested-messages");
			attr_dev(div7, "class", "column centered bordered svelte-qzsvuf");
			attr_dev(div7, "style", div7_style_value = /*image_url*/ ctx[20] ? "width:25%;" : "width:33%;");
			add_location(div7, file$1, 1106, 36, 68342);
			add_location(strong4, file$1, 1128, 46, 70033);
			add_location(span2, file$1, 1128, 40, 70027);
			attr_dev(input0, "type", "checkbox");
			add_location(input0, file$1, 1130, 44, 70187);
			attr_dev(label0, "class", "row centered spaced");
			add_location(label0, file$1, 1129, 40, 70107);
			attr_dev(input1, "type", "checkbox");
			add_location(input1, file$1, 1133, 44, 70425);
			attr_dev(label1, "class", "row centered spaced");
			add_location(label1, file$1, 1132, 40, 70345);
			attr_dev(div8, "id", "refer-to");
			attr_dev(div8, "class", "column centered bordered");
			attr_dev(div8, "style", div8_style_value = /*image_url*/ ctx[20] ? "width:25%;" : "width:33%;");
			add_location(div8, file$1, 1127, 36, 69886);
			attr_dev(div9, "id", "visual-context");
			attr_dev(div9, "class", "column centered bordered svelte-qzsvuf");
			attr_dev(div9, "style", div9_style_value = /*image_url*/ ctx[20] ? "width:25%;" : "display:none;");
			add_location(div9, file$1, 1137, 36, 70661);
			attr_dev(div10, "id", "chatbot-utilities");
			attr_dev(div10, "class", "row centered spaced svelte-qzsvuf");
			add_location(div10, file$1, 1088, 32, 66907);
			attr_dev(label2, "for", "image_upload");
			set_style(label2, "display", "none");
			add_location(label2, file$1, 1166, 40, 72882);
			attr_dev(input2, "accept", "image/png, image/jpeg");
			attr_dev(input2, "type", "file");
			set_style(input2, "display", "none");
			attr_dev(input2, "id", "image_upload");
			attr_dev(input2, "name", "image_upload");
			add_location(input2, file$1, 1167, 40, 72980);
			if (!src_url_equal(img0.src, img0_src_value = "./logos/image-svgrepo-com.svg")) attr_dev(img0, "src", img0_src_value);
			attr_dev(img0, "alt", "Attach image");
			attr_dev(img0, "class", "action-icon");
			add_location(img0, file$1, 1181, 44, 74144);
			attr_dev(button0, "class", "action-button centered column");
			add_location(button0, file$1, 1176, 40, 73791);
			attr_dev(div11, "class", "column spaced");
			add_location(div11, file$1, 1158, 36, 72239);
			set_style(textarea, "width", "100%");
			set_style(textarea, "height", "100%");
			attr_dev(textarea, "placeholder", "Type your message here...");
			attr_dev(textarea, "id", "textarea");
			add_location(textarea, file$1, 1185, 36, 74391);
			if (!src_url_equal(img1.src, img1_src_value = "./logos/send-svgrepo-com.svg")) attr_dev(img1, "src", img1_src_value);
			attr_dev(img1, "alt", "Send");
			attr_dev(img1, "class", "action-icon");
			add_location(img1, file$1, 1192, 40, 75070);
			attr_dev(button1, "class", "action-button centered column");
			button1.disabled = /*is_loading*/ ctx[24];
			add_location(button1, file$1, 1186, 36, 74638);
			attr_dev(div12, "id", "chatbot-input");
			attr_dev(div12, "class", "row spaced centered svelte-qzsvuf");
			add_location(div12, file$1, 1157, 32, 72149);
			attr_dev(div13, "id", "chatbot-actions");
			attr_dev(div13, "class", "column padded spaced centered svelte-qzsvuf");
			add_location(div13, file$1, 1087, 28, 66810);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div3, anchor);
			append_dev(div3, div0);
			append_dev(div0, p0);
			append_dev(p0, strong0);
			append_dev(p0, t1);
			append_dev(div3, t2);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(div3, null);
				}
			}

			append_dev(div3, t3);
			append_dev(div3, div1);
			append_dev(div1, p1);
			append_dev(p1, strong1);
			append_dev(div1, t5);
			mount_component(loadingbar, div1, null);
			append_dev(div3, t6);
			append_dev(div3, div2);
			insert_dev(target, t7, anchor);
			insert_dev(target, div13, anchor);
			append_dev(div13, div10);
			append_dev(div10, div4);
			append_dev(div4, span0);
			append_dev(span0, strong2);
			append_dev(div4, t9);
			if_block0.m(div4, null);
			append_dev(div10, t10);
			append_dev(div10, div7);
			append_dev(div7, span1);
			append_dev(span1, strong3);
			append_dev(div7, t12);
			append_dev(div7, div5);
			append_dev(div7, t14);
			append_dev(div7, div6);
			append_dev(div10, t16);
			append_dev(div10, div8);
			append_dev(div8, span2);
			append_dev(span2, strong4);
			append_dev(div8, t18);
			append_dev(div8, label0);
			append_dev(label0, input0);
			input0.checked = /*referToTranscript*/ ctx[13];
			append_dev(label0, t19);
			append_dev(div8, t20);
			append_dev(div8, label1);
			append_dev(label1, input1);
			input1.checked = /*referToDocuments*/ ctx[14];
			append_dev(label1, t21);
			append_dev(div10, t22);
			append_dev(div10, div9);
			if_block1.m(div9, null);
			append_dev(div13, t23);
			append_dev(div13, div12);
			append_dev(div12, div11);
			append_dev(div11, label2);
			append_dev(div11, t24);
			append_dev(div11, input2);
			/*input2_binding*/ ctx[114](input2);
			append_dev(div11, t25);
			append_dev(div11, button0);
			append_dev(button0, img0);
			append_dev(div12, t26);
			append_dev(div12, textarea);
			set_input_value(textarea, /*inputMessage*/ ctx[12]);
			append_dev(div12, t27);
			append_dev(div12, button1);
			append_dev(button1, img1);
			current = true;

			if (!mounted) {
				dispose = [
					listen_dev(div5, "click", prevent_default(/*click_handler_51*/ ctx[108]), false, true, false, false),
					listen_dev(div6, "click", prevent_default(/*click_handler_52*/ ctx[109]), false, true, false, false),
					listen_dev(input0, "change", /*input0_change_handler*/ ctx[110]),
					listen_dev(input1, "change", /*input1_change_handler*/ ctx[111]),
					listen_dev(input2, "change", /*input2_change_handler*/ ctx[113]),
					listen_dev(input2, "change", /*change_handler*/ ctx[115], false, false, false, false),
					listen_dev(button0, "click", prevent_default(/*click_handler_54*/ ctx[116]), false, true, false, false),
					listen_dev(textarea, "input", /*textarea_input_handler*/ ctx[117]),
					listen_dev(textarea, "keydown", /*keydown_handler*/ ctx[118], false, false, false, false),
					listen_dev(button1, "click", prevent_default(/*click_handler_55*/ ctx[119]), false, true, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*chatbot_messages, is_loading, active_right_tab, feedback_notes, my_notes*/ 16842780 | dirty[1] & /*addNote*/ 32768) {
				each_value_1 = /*chatbot_messages*/ ctx[2];
				validate_each_argument(each_value_1);
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block_1(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(div3, t3);
					}
				}

				group_outros();

				for (i = each_value_1.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}

			const loadingbar_changes = {};

			if (!updating_progress && dirty[0] & /*chatbot_load_progress*/ 67108864) {
				updating_progress = true;
				loadingbar_changes.progress = /*chatbot_load_progress*/ ctx[26];
				add_flush_callback(() => updating_progress = false);
			}

			if (!updating_status && dirty[0] & /*chatbot_load_status*/ 33554432) {
				updating_status = true;
				loadingbar_changes.status = /*chatbot_load_status*/ ctx[25];
				add_flush_callback(() => updating_status = false);
			}

			loadingbar.$set(loadingbar_changes);

			if (!current || dirty[0] & /*is_loading*/ 16777216) {
				toggle_class(div1, "invisible", /*is_loading*/ ctx[24] === false);
			}

			if (current_block_type === (current_block_type = select_block_type_24(ctx)) && if_block0) {
				if_block0.p(ctx, dirty);
			} else {
				if_block0.d(1);
				if_block0 = current_block_type(ctx);

				if (if_block0) {
					if_block0.c();
					if_block0.m(div4, null);
				}
			}

			if (!current || dirty[0] & /*image_url*/ 1048576 && div4_style_value !== (div4_style_value = /*image_url*/ ctx[20] ? "width:25%;" : "width:33%;")) {
				attr_dev(div4, "style", div4_style_value);
			}

			if (!current || dirty[0] & /*image_url*/ 1048576 && div7_style_value !== (div7_style_value = /*image_url*/ ctx[20] ? "width:25%;" : "width:33%;")) {
				attr_dev(div7, "style", div7_style_value);
			}

			if (dirty[0] & /*referToTranscript*/ 8192) {
				input0.checked = /*referToTranscript*/ ctx[13];
			}

			if (dirty[0] & /*referToDocuments*/ 16384) {
				input1.checked = /*referToDocuments*/ ctx[14];
			}

			if (!current || dirty[0] & /*image_url*/ 1048576 && div8_style_value !== (div8_style_value = /*image_url*/ ctx[20] ? "width:25%;" : "width:33%;")) {
				attr_dev(div8, "style", div8_style_value);
			}

			if (current_block_type_1 === (current_block_type_1 = select_block_type_25(ctx)) && if_block1) {
				if_block1.p(ctx, dirty);
			} else {
				if_block1.d(1);
				if_block1 = current_block_type_1(ctx);

				if (if_block1) {
					if_block1.c();
					if_block1.m(div9, null);
				}
			}

			if (!current || dirty[0] & /*image_url*/ 1048576 && div9_style_value !== (div9_style_value = /*image_url*/ ctx[20] ? "width:25%;" : "display:none;")) {
				attr_dev(div9, "style", div9_style_value);
			}

			if (dirty[0] & /*inputMessage*/ 4096) {
				set_input_value(textarea, /*inputMessage*/ ctx[12]);
			}

			if (!current || dirty[0] & /*is_loading*/ 16777216) {
				prop_dev(button1, "disabled", /*is_loading*/ ctx[24]);
			}
		},
		i: function intro(local) {
			if (current) return;

			for (let i = 0; i < each_value_1.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			transition_in(loadingbar.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			transition_out(loadingbar.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div3);
			destroy_each(each_blocks, detaching);
			destroy_component(loadingbar);
			if (detaching) detach_dev(t7);
			if (detaching) detach_dev(div13);
			if_block0.d();
			if_block1.d();
			/*input2_binding*/ ctx[114](null);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_5.name,
		type: "if",
		source: "(965:24) {#if !show_chatbot_settings}",
		ctx
	});

	return block;
}

// (1204:44) {#each Object.keys(chatbot_models) as model}
function create_each_block_3(ctx) {
	let option;
	let t_value = /*model*/ ctx[153] + "";
	let t;

	const block = {
		c: function create() {
			option = element("option");
			t = text(t_value);
			option.__value = /*model*/ ctx[153];
			option.value = option.__value;
			add_location(option, file$1, 1204, 48, 75994);
		},
		m: function mount(target, anchor) {
			insert_dev(target, option, anchor);
			append_dev(option, t);
		},
		p: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(option);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_3.name,
		type: "each",
		source: "(1204:44) {#each Object.keys(chatbot_models) as model}",
		ctx
	});

	return block;
}

// (1250:40) {:else}
function create_else_block_4(ctx) {
	let span;

	const block = {
		c: function create() {
			span = element("span");
			span.textContent = "No resources available.";
			add_location(span, file$1, 1250, 44, 79621);
		},
		m: function mount(target, anchor) {
			insert_dev(target, span, anchor);
		},
		p: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(span);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_4.name,
		type: "else",
		source: "(1250:40) {:else}",
		ctx
	});

	return block;
}

// (1227:40) {#if documents.length > 0}
function create_if_block_14(ctx) {
	let each_1_anchor;
	let each_value_2 = /*documents*/ ctx[1];
	validate_each_argument(each_value_2);
	let each_blocks = [];

	for (let i = 0; i < each_value_2.length; i += 1) {
		each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
	}

	const block = {
		c: function create() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		m: function mount(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(target, anchor);
				}
			}

			insert_dev(target, each_1_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*is_document_loading, document_load_progress, document_load_status, documents*/ 939524098 | dirty[1] & /*deleteDocument*/ 8192) {
				each_value_2 = /*documents*/ ctx[1];
				validate_each_argument(each_value_2);
				let i;

				for (i = 0; i < each_value_2.length; i += 1) {
					const child_ctx = get_each_context_2(ctx, each_value_2, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_2(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_2.length;
			}
		},
		d: function destroy(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(each_1_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_14.name,
		type: "if",
		source: "(1227:40) {#if documents.length > 0}",
		ctx
	});

	return block;
}

// (1228:44) {#each documents as doc,i}
function create_each_block_2(ctx) {
	let div;
	let t0_value = /*doc*/ ctx[151] + "";
	let t0;
	let t1;
	let button;
	let img;
	let img_src_value;
	let t2;
	let mounted;
	let dispose;

	function click_handler_56() {
		return /*click_handler_56*/ ctx[125](/*doc*/ ctx[151], /*i*/ ctx[147]);
	}

	const block = {
		c: function create() {
			div = element("div");
			t0 = text(t0_value);
			t1 = space();
			button = element("button");
			img = element("img");
			t2 = space();
			if (!src_url_equal(img.src, img_src_value = "./logos/delete-x-svgrepo-com.svg")) attr_dev(img, "src", img_src_value);
			attr_dev(img, "alt", "Remove document");
			attr_dev(img, "class", "mini-icon");
			add_location(img, file$1, 1245, 56, 79275);
			button.disabled = /*is_document_loading*/ ctx[29];
			attr_dev(button, "class", "action-button");
			add_location(button, file$1, 1230, 52, 77872);
			attr_dev(div, "class", "row centered spaced centered");
			add_location(div, file$1, 1228, 48, 77719);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, t0);
			append_dev(div, t1);
			append_dev(div, button);
			append_dev(button, img);
			append_dev(div, t2);

			if (!mounted) {
				dispose = listen_dev(button, "click", prevent_default(click_handler_56), false, true, false, false);
				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty[0] & /*documents*/ 2 && t0_value !== (t0_value = /*doc*/ ctx[151] + "")) set_data_dev(t0, t0_value);

			if (dirty[0] & /*is_document_loading*/ 536870912) {
				prop_dev(button, "disabled", /*is_document_loading*/ ctx[29]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_2.name,
		type: "each",
		source: "(1228:44) {#each documents as doc,i}",
		ctx
	});

	return block;
}

// (971:36) {#if message.role != "system"}
function create_if_block_8(ctx) {
	let div5;
	let div3;
	let div0;
	let t0;
	let t1;
	let div2;
	let button0;
	let small;
	let t3;
	let img0;
	let img0_src_value;
	let t4;
	let t5;
	let div1;
	let button1;
	let img1;
	let img1_src_value;
	let t6;
	let div3_class_value;
	let t7;
	let div4;
	let strong;
	let t8_value = /*message*/ ctx[148].role + "";
	let t8;
	let t9;
	let t10;
	let sveltemarkdown;
	let t11;
	let div5_class_value;
	let current;
	let mounted;
	let dispose;
	let if_block0 = "context" in /*message*/ ctx[148] && create_if_block_13(ctx);
	let if_block1 = "image" in /*message*/ ctx[148] && create_if_block_12(ctx);

	function click_handler_46() {
		return /*click_handler_46*/ ctx[101](/*message*/ ctx[148]);
	}

	let if_block2 = "context" in /*message*/ ctx[148] && create_if_block_11(ctx);

	function click_handler_48() {
		return /*click_handler_48*/ ctx[103](/*message*/ ctx[148]);
	}

	let if_block3 = /*message*/ ctx[148].role === "user" && create_if_block_10(ctx);

	sveltemarkdown = new SvelteMarkdown({
			props: { source: /*message*/ ctx[148].content },
			$$inline: true
		});

	let if_block4 = "image" in /*message*/ ctx[148] && /*message*/ ctx[148].role === "user" && create_if_block_9(ctx);

	const block = {
		c: function create() {
			div5 = element("div");
			div3 = element("div");
			div0 = element("div");
			if (if_block0) if_block0.c();
			t0 = space();
			if (if_block1) if_block1.c();
			t1 = space();
			div2 = element("div");
			button0 = element("button");
			small = element("small");
			small.textContent = "Add to My Notes";
			t3 = space();
			img0 = element("img");
			t4 = space();
			if (if_block2) if_block2.c();
			t5 = space();
			div1 = element("div");
			button1 = element("button");
			img1 = element("img");
			t6 = space();
			if (if_block3) if_block3.c();
			t7 = space();
			div4 = element("div");
			strong = element("strong");
			t8 = text(t8_value);
			t9 = text(":");
			t10 = space();
			create_component(sveltemarkdown.$$.fragment);
			t11 = space();
			if (if_block4) if_block4.c();
			attr_dev(div0, "class", "row spaced");
			add_location(div0, file$1, 973, 48, 57537);
			add_location(small, file$1, 996, 56, 59550);
			if (!src_url_equal(img0.src, img0_src_value = "./logos/note-svgrepo-com.svg")) attr_dev(img0, "src", img0_src_value);
			attr_dev(img0, "alt", "Add to my notes");
			attr_dev(img0, "class", "mini-icon");
			add_location(img0, file$1, 997, 56, 59639);
			attr_dev(button0, "class", "action-button row spaced centered");
			add_location(button0, file$1, 990, 52, 58922);
			if (!src_url_equal(img1.src, img1_src_value = "./logos/copy-svgrepo-com.svg")) attr_dev(img1, "src", img1_src_value);
			attr_dev(img1, "alt", "Copy note");
			attr_dev(img1, "class", "mini-icon");
			add_location(img1, file$1, 1018, 60, 61699);
			attr_dev(button1, "class", "action-button column centered");
			add_location(button1, file$1, 1013, 56, 61158);
			attr_dev(div1, "class", "row");
			add_location(div1, file$1, 1012, 52, 61084);
			attr_dev(div2, "class", "row spaced");
			add_location(div2, file$1, 989, 48, 58845);

			attr_dev(div3, "class", div3_class_value = "message-header row " + ("context" in /*message*/ ctx[148] || "image" in /*message*/ ctx[148]
			? 'with-context'
			: 'no-context') + " svelte-qzsvuf");

			add_location(div3, file$1, 972, 44, 57378);
			add_location(strong, file$1, 1065, 48, 65386);
			add_location(div4, file$1, 1064, 44, 65331);
			attr_dev(div5, "class", div5_class_value = "" + (/*message*/ ctx[148].role + " padded column spaced" + " svelte-qzsvuf"));
			add_location(div5, file$1, 971, 40, 57284);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div5, anchor);
			append_dev(div5, div3);
			append_dev(div3, div0);
			if (if_block0) if_block0.m(div0, null);
			append_dev(div0, t0);
			if (if_block1) if_block1.m(div0, null);
			append_dev(div3, t1);
			append_dev(div3, div2);
			append_dev(div2, button0);
			append_dev(button0, small);
			append_dev(button0, t3);
			append_dev(button0, img0);
			append_dev(div2, t4);
			if (if_block2) if_block2.m(div2, null);
			append_dev(div2, t5);
			append_dev(div2, div1);
			append_dev(div1, button1);
			append_dev(button1, img1);
			append_dev(div1, t6);
			if (if_block3) if_block3.m(div1, null);
			append_dev(div5, t7);
			append_dev(div5, div4);
			append_dev(div4, strong);
			append_dev(strong, t8);
			append_dev(strong, t9);
			append_dev(div4, t10);
			mount_component(sveltemarkdown, div4, null);
			append_dev(div5, t11);
			if (if_block4) if_block4.m(div5, null);
			current = true;

			if (!mounted) {
				dispose = [
					listen_dev(button0, "click", click_handler_46, false, false, false, false),
					listen_dev(button1, "click", click_handler_48, false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;

			if ("context" in /*message*/ ctx[148]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_13(ctx);
					if_block0.c();
					if_block0.m(div0, t0);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if ("image" in /*message*/ ctx[148]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_12(ctx);
					if_block1.c();
					if_block1.m(div0, null);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if ("context" in /*message*/ ctx[148]) {
				if (if_block2) {
					if_block2.p(ctx, dirty);
				} else {
					if_block2 = create_if_block_11(ctx);
					if_block2.c();
					if_block2.m(div2, t5);
				}
			} else if (if_block2) {
				if_block2.d(1);
				if_block2 = null;
			}

			if (/*message*/ ctx[148].role === "user") {
				if (if_block3) {
					if_block3.p(ctx, dirty);
				} else {
					if_block3 = create_if_block_10(ctx);
					if_block3.c();
					if_block3.m(div1, null);
				}
			} else if (if_block3) {
				if_block3.d(1);
				if_block3 = null;
			}

			if (!current || dirty[0] & /*chatbot_messages*/ 4 && div3_class_value !== (div3_class_value = "message-header row " + ("context" in /*message*/ ctx[148] || "image" in /*message*/ ctx[148]
			? 'with-context'
			: 'no-context') + " svelte-qzsvuf")) {
				attr_dev(div3, "class", div3_class_value);
			}

			if ((!current || dirty[0] & /*chatbot_messages*/ 4) && t8_value !== (t8_value = /*message*/ ctx[148].role + "")) set_data_dev(t8, t8_value);
			const sveltemarkdown_changes = {};
			if (dirty[0] & /*chatbot_messages*/ 4) sveltemarkdown_changes.source = /*message*/ ctx[148].content;
			sveltemarkdown.$set(sveltemarkdown_changes);

			if ("image" in /*message*/ ctx[148] && /*message*/ ctx[148].role === "user") {
				if (if_block4) {
					if_block4.p(ctx, dirty);
				} else {
					if_block4 = create_if_block_9(ctx);
					if_block4.c();
					if_block4.m(div5, null);
				}
			} else if (if_block4) {
				if_block4.d(1);
				if_block4 = null;
			}

			if (!current || dirty[0] & /*chatbot_messages*/ 4 && div5_class_value !== (div5_class_value = "" + (/*message*/ ctx[148].role + " padded column spaced" + " svelte-qzsvuf"))) {
				attr_dev(div5, "class", div5_class_value);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(sveltemarkdown.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(sveltemarkdown.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div5);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			if (if_block2) if_block2.d();
			if (if_block3) if_block3.d();
			destroy_component(sveltemarkdown);
			if (if_block4) if_block4.d();
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_8.name,
		type: "if",
		source: "(971:36) {#if message.role != \\\"system\\\"}",
		ctx
	});

	return block;
}

// (975:52) {#if "context" in message}
function create_if_block_13(ctx) {
	let div;
	let small;
	let t0;
	let t1_value = /*message*/ ctx[148].context.id + "";
	let t1;
	let t2;

	let t3_value = (/*message*/ ctx[148].context.quote.length > 40
	? /*message*/ ctx[148].context.quote.slice(0, 40) + "..."
	: /*message*/ ctx[148].context.quote) + "";

	let t3;

	const block = {
		c: function create() {
			div = element("div");
			small = element("small");
			t0 = text("Context: F#");
			t1 = text(t1_value);
			t2 = space();
			t3 = text(t3_value);
			add_location(small, file$1, 976, 60, 57792);
			attr_dev(div, "class", "context-tag feedback svelte-qzsvuf");
			add_location(div, file$1, 975, 56, 57697);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, small);
			append_dev(small, t0);
			append_dev(small, t1);
			append_dev(small, t2);
			append_dev(small, t3);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*chatbot_messages*/ 4 && t1_value !== (t1_value = /*message*/ ctx[148].context.id + "")) set_data_dev(t1, t1_value);

			if (dirty[0] & /*chatbot_messages*/ 4 && t3_value !== (t3_value = (/*message*/ ctx[148].context.quote.length > 40
			? /*message*/ ctx[148].context.quote.slice(0, 40) + "..."
			: /*message*/ ctx[148].context.quote) + "")) set_data_dev(t3, t3_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_13.name,
		type: "if",
		source: "(975:52) {#if \\\"context\\\" in message}",
		ctx
	});

	return block;
}

// (982:52) {#if "image" in message}
function create_if_block_12(ctx) {
	let div;
	let small;

	let t_value = (/*message*/ ctx[148].role === "user"
	? "Attached image"
	: "Response to image") + "";

	let t;

	const block = {
		c: function create() {
			div = element("div");
			small = element("small");
			t = text(t_value);
			add_location(small, file$1, 983, 60, 58413);
			attr_dev(div, "class", "context-tag image svelte-qzsvuf");
			add_location(div, file$1, 982, 56, 58321);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, small);
			append_dev(small, t);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*chatbot_messages*/ 4 && t_value !== (t_value = (/*message*/ ctx[148].role === "user"
			? "Attached image"
			: "Response to image") + "")) set_data_dev(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_12.name,
		type: "if",
		source: "(982:52) {#if \\\"image\\\" in message}",
		ctx
	});

	return block;
}

// (1001:52) {#if "context" in message}
function create_if_block_11(ctx) {
	let button;
	let small;
	let t0;
	let t1_value = /*message*/ ctx[148].context.id + "";
	let t1;
	let t2;
	let t3;
	let img;
	let img_src_value;
	let mounted;
	let dispose;

	function click_handler_47() {
		return /*click_handler_47*/ ctx[102](/*message*/ ctx[148]);
	}

	const block = {
		c: function create() {
			button = element("button");
			small = element("small");
			t0 = text("Add to F#");
			t1 = text(t1_value);
			t2 = text(" Notes");
			t3 = space();
			img = element("img");
			add_location(small, file$1, 1007, 60, 60711);
			if (!src_url_equal(img.src, img_src_value = "./logos/note-svgrepo-com.svg")) attr_dev(img, "src", img_src_value);
			attr_dev(img, "alt", "Add feedback note");
			attr_dev(img, "class", "mini-icon");
			add_location(img, file$1, 1008, 60, 60824);
			attr_dev(button, "class", "action-button row spaced centered");
			add_location(button, file$1, 1001, 56, 59970);
		},
		m: function mount(target, anchor) {
			insert_dev(target, button, anchor);
			append_dev(button, small);
			append_dev(small, t0);
			append_dev(small, t1);
			append_dev(small, t2);
			append_dev(button, t3);
			append_dev(button, img);

			if (!mounted) {
				dispose = listen_dev(button, "click", click_handler_47, false, false, false, false);
				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty[0] & /*chatbot_messages*/ 4 && t1_value !== (t1_value = /*message*/ ctx[148].context.id + "")) set_data_dev(t1, t1_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(button);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_11.name,
		type: "if",
		source: "(1001:52) {#if \\\"context\\\" in message}",
		ctx
	});

	return block;
}

// (1022:56) {#if message.role==="user"}
function create_if_block_10(ctx) {
	let button;
	let img;
	let img_src_value;
	let mounted;
	let dispose;

	function click_handler_49() {
		return /*click_handler_49*/ ctx[104](/*message*/ ctx[148]);
	}

	const block = {
		c: function create() {
			button = element("button");
			img = element("img");
			if (!src_url_equal(img.src, img_src_value = "./logos/delete-x-svgrepo-com.svg")) attr_dev(img, "src", img_src_value);
			attr_dev(img, "alt", "Delete message");
			attr_dev(img, "class", "mini-icon");
			add_location(img, file$1, 1054, 64, 64754);
			button.disabled = /*is_loading*/ ctx[24];
			attr_dev(button, "class", "action-button column centered");
			add_location(button, file$1, 1022, 60, 61986);
		},
		m: function mount(target, anchor) {
			insert_dev(target, button, anchor);
			append_dev(button, img);

			if (!mounted) {
				dispose = listen_dev(button, "click", click_handler_49, false, false, false, false);
				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty[0] & /*is_loading*/ 16777216) {
				prop_dev(button, "disabled", /*is_loading*/ ctx[24]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(button);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_10.name,
		type: "if",
		source: "(1022:56) {#if message.role===\\\"user\\\"}",
		ctx
	});

	return block;
}

// (1072:44) {#if "image" in message && message.role==="user"}
function create_if_block_9(ctx) {
	let div;
	let img;
	let img_src_value;

	const block = {
		c: function create() {
			div = element("div");
			img = element("img");
			if (!src_url_equal(img.src, img_src_value = /*message*/ ctx[148].image)) attr_dev(img, "src", img_src_value);
			attr_dev(img, "alt", "Visual context");
			set_style(img, "width", "50%");
			set_style(img, "height", "auto");
			add_location(img, file$1, 1073, 52, 65910);
			attr_dev(div, "class", "column centered");
			set_style(div, "width", "100%");
			add_location(div, file$1, 1072, 48, 65807);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, img);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*chatbot_messages*/ 4 && !src_url_equal(img.src, img_src_value = /*message*/ ctx[148].image)) {
				attr_dev(img, "src", img_src_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_9.name,
		type: "if",
		source: "(1072:44) {#if \\\"image\\\" in message && message.role===\\\"user\\\"}",
		ctx
	});

	return block;
}

// (970:32) {#each chatbot_messages as message}
function create_each_block_1(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*message*/ ctx[148].role != "system" && create_if_block_8(ctx);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (/*message*/ ctx[148].role != "system") {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty[0] & /*chatbot_messages*/ 4) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block_8(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_1.name,
		type: "each",
		source: "(970:32) {#each chatbot_messages as message}",
		ctx
	});

	return block;
}

// (1103:40) {:else}
function create_else_block_2(ctx) {
	let span;

	const block = {
		c: function create() {
			span = element("span");
			span.textContent = "None. Add by selecting from the feedback.";
			add_location(span, file$1, 1103, 44, 68161);
		},
		m: function mount(target, anchor) {
			insert_dev(target, span, anchor);
		},
		p: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(span);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_2.name,
		type: "else",
		source: "(1103:40) {:else}",
		ctx
	});

	return block;
}

// (1092:40) {#if context}
function create_if_block_7(ctx) {
	let div;
	let span;
	let t0;
	let t1_value = /*context*/ ctx[18].id + "";
	let t1;
	let t2;
	let t3_value = /*context*/ ctx[18].quote.slice(0, 30) + "";
	let t3;
	let t4;
	let t5;
	let button;
	let img;
	let img_src_value;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			div = element("div");
			span = element("span");
			t0 = text("F#");
			t1 = text(t1_value);
			t2 = text(":");
			t3 = text(t3_value);
			t4 = text("...");
			t5 = space();
			button = element("button");
			img = element("img");
			add_location(span, file$1, 1093, 48, 67374);
			if (!src_url_equal(img.src, img_src_value = "./logos/delete-x-svgrepo-com.svg")) attr_dev(img, "src", img_src_value);
			attr_dev(img, "alt", "Remove context");
			attr_dev(img, "class", "mini-icon");
			add_location(img, file$1, 1099, 52, 67876);
			add_location(button, file$1, 1094, 48, 67483);
			attr_dev(div, "class", "suggested-message row  svelte-qzsvuf");
			add_location(div, file$1, 1092, 44, 67288);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, span);
			append_dev(span, t0);
			append_dev(span, t1);
			append_dev(span, t2);
			append_dev(span, t3);
			append_dev(span, t4);
			append_dev(div, t5);
			append_dev(div, button);
			append_dev(button, img);

			if (!mounted) {
				dispose = listen_dev(button, "click", prevent_default(/*click_handler_50*/ ctx[107]), false, true, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*context*/ 262144 && t1_value !== (t1_value = /*context*/ ctx[18].id + "")) set_data_dev(t1, t1_value);
			if (dirty[0] & /*context*/ 262144 && t3_value !== (t3_value = /*context*/ ctx[18].quote.slice(0, 30) + "")) set_data_dev(t3, t3_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_7.name,
		type: "if",
		source: "(1092:40) {#if context}",
		ctx
	});

	return block;
}

// (1153:40) {:else}
function create_else_block_1(ctx) {
	const block = { c: noop, m: noop, p: noop, d: noop };

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_1.name,
		type: "else",
		source: "(1153:40) {:else}",
		ctx
	});

	return block;
}

// (1139:40) {#if image_url}
function create_if_block_6(ctx) {
	let span;
	let strong;
	let t1;
	let div;
	let img0;
	let img0_src_value;
	let t2;
	let button;
	let img1;
	let img1_src_value;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			span = element("span");
			strong = element("strong");
			strong.textContent = "Attached image:";
			t1 = space();
			div = element("div");
			img0 = element("img");
			t2 = space();
			button = element("button");
			img1 = element("img");
			add_location(strong, file$1, 1139, 50, 70877);
			add_location(span, file$1, 1139, 44, 70871);
			if (!src_url_equal(img0.src, img0_src_value = /*image_url*/ ctx[20])) attr_dev(img0, "src", img0_src_value);
			attr_dev(img0, "alt", "Visual context");
			set_style(img0, "width", "100%");
			set_style(img0, "height", "100%");
			add_location(img0, file$1, 1141, 48, 71060);
			if (!src_url_equal(img1.src, img1_src_value = "./logos/delete-x-svgrepo-com.svg")) attr_dev(img1, "src", img1_src_value);
			attr_dev(img1, "alt", "Remove image");
			attr_dev(img1, "class", "mini-icon");
			add_location(img1, file$1, 1148, 52, 71660);
			add_location(button, file$1, 1142, 48, 71184);
			attr_dev(div, "class", "row");
			set_style(div, "width", "100%");
			set_style(div, "height", "100%");
			add_location(div, file$1, 1140, 44, 70961);
		},
		m: function mount(target, anchor) {
			insert_dev(target, span, anchor);
			append_dev(span, strong);
			insert_dev(target, t1, anchor);
			insert_dev(target, div, anchor);
			append_dev(div, img0);
			append_dev(div, t2);
			append_dev(div, button);
			append_dev(button, img1);

			if (!mounted) {
				dispose = listen_dev(button, "click", prevent_default(/*click_handler_53*/ ctx[112]), false, true, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*image_url*/ 1048576 && !src_url_equal(img0.src, img0_src_value = /*image_url*/ ctx[20])) {
				attr_dev(img0, "src", img0_src_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(span);
			if (detaching) detach_dev(t1);
			if (detaching) detach_dev(div);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_6.name,
		type: "if",
		source: "(1139:40) {#if image_url}",
		ctx
	});

	return block;
}

// (919:28) {:else}
function create_else_block(ctx) {
	let video;
	let track;
	let track_src_value;
	let video_src_value;

	const block = {
		c: function create() {
			video = element("video");
			track = element("track");
			attr_dev(track, "kind", "captions");
			if (!src_url_equal(track.src, track_src_value = "blank.vtt")) attr_dev(track, "src", track_src_value);
			attr_dev(track, "srclang", "en");
			add_location(track, file$1, 920, 36, 53827);
			if (!src_url_equal(video.src, video_src_value = "video.mp4")) attr_dev(video, "src", video_src_value);
			video.controls = true;
			set_style(video, "width", "100%");
			set_style(video, "height", "100%");
			add_location(video, file$1, 919, 32, 53699);
		},
		m: function mount(target, anchor) {
			insert_dev(target, video, anchor);
			append_dev(video, track);
			/*video_binding_1*/ ctx[96](video);
		},
		p: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(video);
			/*video_binding_1*/ ctx[96](null);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block.name,
		type: "else",
		source: "(919:28) {:else}",
		ctx
	});

	return block;
}

// (917:67) 
function create_if_block_3(ctx) {
	let audio;
	let audio_src_value;

	const block = {
		c: function create() {
			audio = element("audio");
			if (!src_url_equal(audio.src, audio_src_value = /*recording*/ ctx[6].audio)) attr_dev(audio, "src", audio_src_value);
			audio.controls = true;
			set_style(audio, "width", "100%");
			set_style(audio, "height", "100%");
			add_location(audio, file$1, 917, 32, 53525);
		},
		m: function mount(target, anchor) {
			insert_dev(target, audio, anchor);
			/*audio_binding*/ ctx[95](audio);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*recording*/ 64 && !src_url_equal(audio.src, audio_src_value = /*recording*/ ctx[6].audio)) {
				attr_dev(audio, "src", audio_src_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(audio);
			/*audio_binding*/ ctx[95](null);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_3.name,
		type: "if",
		source: "(917:67) ",
		ctx
	});

	return block;
}

// (913:28) {#if recording && recording.video}
function create_if_block_2$1(ctx) {
	let video;
	let track;
	let track_src_value;
	let video_src_value;

	const block = {
		c: function create() {
			video = element("video");
			track = element("track");
			attr_dev(track, "kind", "captions");
			if (!src_url_equal(track.src, track_src_value = "blank.vtt")) attr_dev(track, "src", track_src_value);
			attr_dev(track, "srclang", "en");
			add_location(track, file$1, 914, 36, 53331);
			if (!src_url_equal(video.src, video_src_value = /*recording*/ ctx[6].video)) attr_dev(video, "src", video_src_value);
			video.controls = true;
			set_style(video, "width", "100%");
			set_style(video, "height", "100%");
			add_location(video, file$1, 913, 32, 53197);
		},
		m: function mount(target, anchor) {
			insert_dev(target, video, anchor);
			append_dev(video, track);
			/*video_binding*/ ctx[94](video);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*recording*/ 64 && !src_url_equal(video.src, video_src_value = /*recording*/ ctx[6].video)) {
				attr_dev(video, "src", video_src_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(video);
			/*video_binding*/ ctx[94](null);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2$1.name,
		type: "if",
		source: "(913:28) {#if recording && recording.video}",
		ctx
	});

	return block;
}

// (926:28) {#if recording && recording.transcript}
function create_if_block_1$1(ctx) {
	let p;
	let each_value = /*recording*/ ctx[6].transcript_list;
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			p = element("p");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr_dev(p, "class", "spaced padded");
			add_location(p, file$1, 926, 32, 54168);
		},
		m: function mount(target, anchor) {
			insert_dev(target, p, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(p, null);
				}
			}
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*recording, mediaPlayer*/ 2112) {
				each_value = /*recording*/ ctx[6].transcript_list;
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(p, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(p);
			destroy_each(each_blocks, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$1.name,
		type: "if",
		source: "(926:28) {#if recording && recording.transcript}",
		ctx
	});

	return block;
}

// (928:36) {#each recording.transcript_list as excerpt, i}
function create_each_block(ctx) {
	let span0;
	let t0;
	let t1_value = /*excerpt*/ ctx[145].start_timestamp + "";
	let t1;
	let t2;
	let t3;
	let span1;
	let t4;
	let t5_value = /*excerpt*/ ctx[145].end_timestamp + "";
	let t5;
	let t6;
	let t7;
	let br0;
	let t8;

	let t9_value = (/*excerpt*/ ctx[145].speaker
	? /*excerpt*/ ctx[145].speaker + ":"
	: "") + "";

	let t9;
	let t10;
	let span2;
	let raw_value = /*excerpt*/ ctx[145].dialogue + "";
	let span2_id_value;
	let t11;
	let br1;
	let br2;
	let mounted;
	let dispose;

	function click_handler_43() {
		return /*click_handler_43*/ ctx[97](/*excerpt*/ ctx[145]);
	}

	function click_handler_44() {
		return /*click_handler_44*/ ctx[98](/*excerpt*/ ctx[145]);
	}

	const block = {
		c: function create() {
			span0 = element("span");
			t0 = text("[");
			t1 = text(t1_value);
			t2 = text("]");
			t3 = text(" - ");
			span1 = element("span");
			t4 = text("[");
			t5 = text(t5_value);
			t6 = text("]");
			t7 = space();
			br0 = element("br");
			t8 = space();
			t9 = text(t9_value);
			t10 = space();
			span2 = element("span");
			t11 = space();
			br1 = element("br");
			br2 = element("br");
			attr_dev(span0, "class", "timestamp svelte-qzsvuf");
			add_location(span0, file$1, 928, 40, 54319);
			attr_dev(span1, "class", "timestamp svelte-qzsvuf");
			add_location(span1, file$1, 928, 254, 54533);
			add_location(br0, file$1, 929, 40, 54777);
			attr_dev(span2, "id", span2_id_value = /*excerpt*/ ctx[145].id);
			attr_dev(span2, "class", "svelte-qzsvuf");
			add_location(span2, file$1, 931, 40, 54909);
			add_location(br1, file$1, 933, 48, 55050);
			add_location(br2, file$1, 933, 52, 55054);
		},
		m: function mount(target, anchor) {
			insert_dev(target, span0, anchor);
			append_dev(span0, t0);
			append_dev(span0, t1);
			append_dev(span0, t2);
			insert_dev(target, t3, anchor);
			insert_dev(target, span1, anchor);
			append_dev(span1, t4);
			append_dev(span1, t5);
			append_dev(span1, t6);
			insert_dev(target, t7, anchor);
			insert_dev(target, br0, anchor);
			insert_dev(target, t8, anchor);
			insert_dev(target, t9, anchor);
			insert_dev(target, t10, anchor);
			insert_dev(target, span2, anchor);
			span2.innerHTML = raw_value;
			insert_dev(target, t11, anchor);
			insert_dev(target, br1, anchor);
			insert_dev(target, br2, anchor);

			if (!mounted) {
				dispose = [
					listen_dev(span0, "click", click_handler_43, false, false, false, false),
					listen_dev(span1, "click", click_handler_44, false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty[0] & /*recording*/ 64 && t1_value !== (t1_value = /*excerpt*/ ctx[145].start_timestamp + "")) set_data_dev(t1, t1_value);
			if (dirty[0] & /*recording*/ 64 && t5_value !== (t5_value = /*excerpt*/ ctx[145].end_timestamp + "")) set_data_dev(t5, t5_value);

			if (dirty[0] & /*recording*/ 64 && t9_value !== (t9_value = (/*excerpt*/ ctx[145].speaker
			? /*excerpt*/ ctx[145].speaker + ":"
			: "") + "")) set_data_dev(t9, t9_value);

			if (dirty[0] & /*recording*/ 64 && raw_value !== (raw_value = /*excerpt*/ ctx[145].dialogue + "")) span2.innerHTML = raw_value;
			if (dirty[0] & /*recording*/ 64 && span2_id_value !== (span2_id_value = /*excerpt*/ ctx[145].id)) {
				attr_dev(span2, "id", span2_id_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(span0);
			if (detaching) detach_dev(t3);
			if (detaching) detach_dev(span1);
			if (detaching) detach_dev(t7);
			if (detaching) detach_dev(br0);
			if (detaching) detach_dev(t8);
			if (detaching) detach_dev(t9);
			if (detaching) detach_dev(t10);
			if (detaching) detach_dev(span2);
			if (detaching) detach_dev(t11);
			if (detaching) detach_dev(br1);
			if (detaching) detach_dev(br2);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(928:36) {#each recording.transcript_list as excerpt, i}",
		ctx
	});

	return block;
}

function create_fragment$1(ctx) {
	let div10;
	let div5;
	let div4;
	let div2;
	let div0;
	let t0;
	let div1;
	let button0;
	let img0;
	let img0_src_value;
	let t1;
	let button1;
	let img1;
	let img1_src_value;
	let t2;
	let div3;
	let t3;
	let div9;
	let div8;
	let div6;
	let t4;
	let div7;
	let current_block_type_index;
	let if_block1;
	let current;
	let mounted;
	let dispose;
	let each_value_13 = /*left_panel_tabs*/ ctx[35];
	validate_each_argument(each_value_13);
	let each_blocks_1 = [];

	for (let i = 0; i < each_value_13.length; i += 1) {
		each_blocks_1[i] = create_each_block_13(get_each_context_13(ctx, each_value_13, i));
	}

	function select_block_type(ctx, dirty) {
		if (/*active_left_tab*/ ctx[17] === 0) return create_if_block_21;
		if (/*active_left_tab*/ ctx[17] === 1) return create_if_block_36;
	}

	let current_block_type = select_block_type(ctx);
	let if_block0 = current_block_type && current_block_type(ctx);
	let each_value_8 = /*right_panel_tabs*/ ctx[36];
	validate_each_argument(each_value_8);
	let each_blocks = [];

	for (let i = 0; i < each_value_8.length; i += 1) {
		each_blocks[i] = create_each_block_8(get_each_context_8(ctx, each_value_8, i));
	}

	const if_block_creators = [create_if_block$1, create_if_block_4, create_if_block_15];
	const if_blocks = [];

	function select_block_type_21(ctx, dirty) {
		if (/*active_right_tab*/ ctx[16] === 0) return 0;
		if (/*active_right_tab*/ ctx[16] === 1) return 1;
		if (/*active_right_tab*/ ctx[16] === 2) return 2;
		return -1;
	}

	if (~(current_block_type_index = select_block_type_21(ctx))) {
		if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	}

	const block = {
		c: function create() {
			div10 = element("div");
			div5 = element("div");
			div4 = element("div");
			div2 = element("div");
			div0 = element("div");

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].c();
			}

			t0 = space();
			div1 = element("div");
			button0 = element("button");
			img0 = element("img");
			t1 = space();
			button1 = element("button");
			img1 = element("img");
			t2 = space();
			div3 = element("div");
			if (if_block0) if_block0.c();
			t3 = space();
			div9 = element("div");
			div8 = element("div");
			div6 = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t4 = space();
			div7 = element("div");
			if (if_block1) if_block1.c();
			attr_dev(div0, "class", "row");
			add_location(div0, file$1, 387, 16, 12244);
			if (!src_url_equal(img0.src, img0_src_value = "./logos/row-vertical-svgrepo-com.svg")) attr_dev(img0, "src", img0_src_value);
			attr_dev(img0, "alt", "Row view");
			attr_dev(img0, "class", "mini-icon");
			add_location(img0, file$1, 402, 24, 13146);
			attr_dev(button0, "class", "tab svelte-qzsvuf");
			toggle_class(button0, "active", /*left_display_styles*/ ctx[5][/*active_left_tab*/ ctx[17]] === "row");
			add_location(button0, file$1, 398, 20, 12825);
			if (!src_url_equal(img1.src, img1_src_value = "./logos/grid-svgrepo-com.svg")) attr_dev(img1, "src", img1_src_value);
			attr_dev(img1, "alt", "Grid view");
			attr_dev(img1, "class", "mini-icon");
			add_location(img1, file$1, 408, 24, 13603);
			attr_dev(button1, "class", "tab svelte-qzsvuf");
			toggle_class(button1, "active", /*left_display_styles*/ ctx[5][/*active_left_tab*/ ctx[17]] === "grid");
			add_location(button1, file$1, 404, 20, 13279);
			attr_dev(div1, "class", "row");
			add_location(div1, file$1, 397, 16, 12787);
			attr_dev(div2, "class", "tab-header space-between svelte-qzsvuf");
			add_location(div2, file$1, 386, 12, 12189);
			attr_dev(div3, "class", "tab-content padded svelte-qzsvuf");
			set_style(div3, "overflow-y", "auto");
			add_location(div3, file$1, 413, 12, 13764);
			attr_dev(div4, "class", "tabbed-area bordered svelte-qzsvuf");
			add_location(div4, file$1, 385, 8, 12142);
			attr_dev(div5, "id", "left-panel");
			attr_dev(div5, "class", "column svelte-qzsvuf");
			add_location(div5, file$1, 384, 4, 12097);
			attr_dev(div6, "class", "tab-header svelte-qzsvuf");
			add_location(div6, file$1, 903, 12, 52453);
			attr_dev(div7, "class", "tab-content column svelte-qzsvuf");
			add_location(div7, file$1, 908, 12, 52865);
			attr_dev(div8, "class", "tabbed-area bordered svelte-qzsvuf");
			add_location(div8, file$1, 902, 8, 52406);
			attr_dev(div9, "id", "right-panel");
			attr_dev(div9, "class", "column  svelte-qzsvuf");
			add_location(div9, file$1, 901, 4, 52359);
			attr_dev(div10, "id", "feedback-list-page");
			attr_dev(div10, "class", "spaced svelte-qzsvuf");
			add_location(div10, file$1, 383, 0, 12013);
		},
		l: function claim(nodes) {
			throw new Error_1$1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div10, anchor);
			append_dev(div10, div5);
			append_dev(div5, div4);
			append_dev(div4, div2);
			append_dev(div2, div0);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				if (each_blocks_1[i]) {
					each_blocks_1[i].m(div0, null);
				}
			}

			append_dev(div2, t0);
			append_dev(div2, div1);
			append_dev(div1, button0);
			append_dev(button0, img0);
			append_dev(div1, t1);
			append_dev(div1, button1);
			append_dev(button1, img1);
			append_dev(div4, t2);
			append_dev(div4, div3);
			if (if_block0) if_block0.m(div3, null);
			append_dev(div10, t3);
			append_dev(div10, div9);
			append_dev(div9, div8);
			append_dev(div8, div6);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(div6, null);
				}
			}

			append_dev(div8, t4);
			append_dev(div8, div7);

			if (~current_block_type_index) {
				if_blocks[current_block_type_index].m(div7, null);
			}

			current = true;

			if (!mounted) {
				dispose = [
					listen_dev(button0, "click", /*click_handler_1*/ ctx[50], false, false, false, false),
					listen_dev(button1, "click", /*click_handler_2*/ ctx[51], false, false, false, false),
					listen_dev(div10, "window:click", /*deselectFeedback*/ ctx[39], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*active_left_tab*/ 131072 | dirty[1] & /*left_panel_tabs*/ 16) {
				each_value_13 = /*left_panel_tabs*/ ctx[35];
				validate_each_argument(each_value_13);
				let i;

				for (i = 0; i < each_value_13.length; i += 1) {
					const child_ctx = get_each_context_13(ctx, each_value_13, i);

					if (each_blocks_1[i]) {
						each_blocks_1[i].p(child_ctx, dirty);
					} else {
						each_blocks_1[i] = create_each_block_13(child_ctx);
						each_blocks_1[i].c();
						each_blocks_1[i].m(div0, null);
					}
				}

				for (; i < each_blocks_1.length; i += 1) {
					each_blocks_1[i].d(1);
				}

				each_blocks_1.length = each_value_13.length;
			}

			if (!current || dirty[0] & /*left_display_styles, active_left_tab*/ 131104) {
				toggle_class(button0, "active", /*left_display_styles*/ ctx[5][/*active_left_tab*/ ctx[17]] === "row");
			}

			if (!current || dirty[0] & /*left_display_styles, active_left_tab*/ 131104) {
				toggle_class(button1, "active", /*left_display_styles*/ ctx[5][/*active_left_tab*/ ctx[17]] === "grid");
			}

			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block0) {
				if_block0.p(ctx, dirty);
			} else {
				if (if_block0) if_block0.d(1);
				if_block0 = current_block_type && current_block_type(ctx);

				if (if_block0) {
					if_block0.c();
					if_block0.m(div3, null);
				}
			}

			if (dirty[0] & /*active_right_tab*/ 65536 | dirty[1] & /*right_panel_tabs*/ 32) {
				each_value_8 = /*right_panel_tabs*/ ctx[36];
				validate_each_argument(each_value_8);
				let i;

				for (i = 0; i < each_value_8.length; i += 1) {
					const child_ctx = get_each_context_8(ctx, each_value_8, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_8(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div6, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_8.length;
			}

			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type_21(ctx);

			if (current_block_type_index === previous_block_index) {
				if (~current_block_type_index) {
					if_blocks[current_block_type_index].p(ctx, dirty);
				}
			} else {
				if (if_block1) {
					group_outros();

					transition_out(if_blocks[previous_block_index], 1, 1, () => {
						if_blocks[previous_block_index] = null;
					});

					check_outros();
				}

				if (~current_block_type_index) {
					if_block1 = if_blocks[current_block_type_index];

					if (!if_block1) {
						if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
						if_block1.c();
					} else {
						if_block1.p(ctx, dirty);
					}

					transition_in(if_block1, 1);
					if_block1.m(div7, null);
				} else {
					if_block1 = null;
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block1);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block1);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div10);
			destroy_each(each_blocks_1, detaching);

			if (if_block0) {
				if_block0.d();
			}

			destroy_each(each_blocks, detaching);

			if (~current_block_type_index) {
				if_blocks[current_block_type_index].d();
			}

			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

async function handleImageUpload(image_files) {
	let image_file = image_files[0];

	if (image_file) {
		if (image_file.type.includes('image')) {
			console.log(image_file);
			let image_url = URL.createObjectURL(image_file);

			// alert("Image uploaded successfully.");
			return [image_url, image_file];
		} else {
			alert("Please select an image file.");
		}
	} else {
		console.log("No image selected.");
	}

	return null;
}

async function paraphrasePositively(feedback_quote, excerpt) {
	const response = await fetch("/positively_paraphrase_feedback", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ feedback: feedback_quote, excerpt })
	});

	if (!response.ok) {
		throw new Error("Failed to detect feedback");
	}

	const json = await response.json();
	let paraphrased_feedback = json["paraphrased_feedback"];
	return paraphrased_feedback;
}

function showParaphrasedQuote(feedback, show = true) {
	feedback.show_paraphrased = show;
}

async function generateTask(feedback_quote, excerpt) {
	const response = await fetch("/generate_task", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ feedback: feedback_quote, excerpt })
	});

	if (!response.ok) {
		throw new Error("Failed to generate task");
	}

	const json = await response.json();
	let task = json["task"];
	return task;
}

const func = (a, b) => a - b;

function instance$1($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('FeedbackList', slots, []);
	let { feedback_list } = $$props;
	let { recording } = $$props;
	let { documents = [] } = $$props;

	let { chatbot_messages = [
		{
			"content": "You are an expert senior interior designer who is tasked to assist less experienced interior designers like students and junior interior designers with their work by answering their questions on a wide range of interior design topics. ",
			"role": "system"
		}
	] } = $$props;

	let { my_notes = [] } = $$props;
	let { feedback_notes = {} } = $$props;
	let { left_display_styles = { 0: "row", 1: "grid" } } = $$props;
	let show_chatbot_settings = false;

	let chatbot_models = {
		"GPT-4o": "gpt-4o",
		"GPT-4o Mini": "gpt-4o-mini",
		"The Interior Design Reference & Specification GPT": "ft:gpt-4o-mini-2024-07-18:im-lab:the-interior-des:9p9NTD1W",
		"Planning and Designers Handbook GPT": "ft:gpt-4o-mini-2024-07-18:im-lab:planning-and-des:9p9vtdRF",
		"Interior Design Illustrated GPT": "ft:gpt-4o-mini-2024-07-18:im-lab:int-illustrated:9qXQyPfI"
	};

	let selected_chatbot = "GPT-4o";
	let chatbot_temperature = 0.0;
	let chatbot_max_output_tokens = 256;
	let mediaPlayer;
	let inputMessage = "";
	let referToTranscript = true;
	let referToDocuments = true;
	let selected_feedback;
	let active_right_tab = 0;
	let active_left_tab = 0;
	let context;
	let selected_image;
	let image_url;
	let image_files;
	let image_input;
	let document_files, document_file_input;
	let left_panel_tabs = ["Critical Feedback", "Positive Feedback"];
	let right_panel_tabs = ["Transcript", "Chatbot", "Notes"];
	let is_loading = false;
	let chatbot_load_status = "";
	let chatbot_load_progress = 0;
	let ld_bar_chatbot;
	let document_load_status = "";
	let document_load_progress = 0;
	let is_document_loading = false;

	function removeFeedback(feedback) {
		if (selected_feedback === feedback) {
			$$invalidate(15, selected_feedback = null);
		}

		$$invalidate(0, feedback_list = feedback_list.filter(f => f !== feedback));
		$$invalidate(0, feedback_list);
	}

	function selectFeedback(feedback, event) {
		$$invalidate(15, selected_feedback = feedback);
		event.stopPropagation(); // Prevents the event from bubbling up to the window
	}

	function deselectFeedback() {
		$$invalidate(15, selected_feedback = null);
	}

	let sortKey = null;
	let sortAscending = true;

	function sortFeedbackList(key) {
		if (sortKey === key) {
			$$invalidate(31, sortAscending = !sortAscending);
		} else {
			$$invalidate(30, sortKey = key);
			$$invalidate(31, sortAscending = true);
		}

		feedback_list.sort((a, b) => {
			if (a[key] < b[key]) return sortAscending ? -1 : 1;
			if (a[key] > b[key]) return sortAscending ? 1 : -1;
			return 0;
		});

		$$invalidate(0, feedback_list);
	}

	async function sendMessage(inputMessage, context = null) {
		let inputMessageClone = inputMessage.slice();

		if (is_loading) {
			alert("Please wait for the current message to be processed.");
			return;
		}

		$$invalidate(24, is_loading = true);

		if (inputMessage.trim() === "") {
			alert("Please enter a message.");
			return;
		}

		let message = { role: "user", content: inputMessage };

		if (context) {
			message["context"] = context;
			let context_string = "\n\nHere is the piece of feedback as context.";
			context_string += "\nF#" + context.id + ": \"" + context.speaker + ": " + context.quote + "\".";
			inputMessageClone += context_string;
		}

		let body = {
			message: inputMessageClone,
			image_data: null,
			max_output_tokens: chatbot_max_output_tokens,
			temperature: chatbot_temperature,
			model: chatbot_models[selected_chatbot],
			refer_to_transcript: referToTranscript,
			refer_to_documents: referToDocuments
		};

		image_url ? message["image"] = image_url : null;

		if (selected_image) {
			$$invalidate(25, chatbot_load_status = "Uploading image...");
			$$invalidate(26, chatbot_load_progress = 30);
			let image_base64 = await convertImageToBase64(selected_image);
			body["image_data"] = image_base64;
			message["image_path"] = await saveBase64Image(image_base64);
			body["image_path"] = message["image_path"];
		}

		chatbot_messages.push(message);
		$$invalidate(2, chatbot_messages);
		console.log(chatbot_messages);
		$$invalidate(0, feedback_list);
		await saveDisplayChatbotMessages(chatbot_messages);
		$$invalidate(25, chatbot_load_status = "Thinking...");
		$$invalidate(26, chatbot_load_progress = 50);

		const response = await fetch("/message_chatbot", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body)
		});

		if (!response.ok) {
			throw new Error("Failed to send message");
		}

		const json = await response.json();
		let chatbot_response = json["chatbot_response"];
		$$invalidate(25, chatbot_load_status = "Done!");
		$$invalidate(26, chatbot_load_progress = 100);
		await pause(1200);
		await logAction("FeedbackList: Sent message", [inputMessage, context, image_url]);

		let assistant_message = {
			role: "assistant",
			content: chatbot_response
		};

		context ? assistant_message["context"] = context : null;

		image_url
		? assistant_message["image"] = image_url
		: null;

		chatbot_messages.push(assistant_message);
		$$invalidate(2, chatbot_messages);
		$$invalidate(0, feedback_list);
		await saveDisplayChatbotMessages(chatbot_messages);
		$$invalidate(24, is_loading = false);
		$$invalidate(26, chatbot_load_progress = 0);
	}

	function addContext(feedback) {
		if (context === feedback) {
			alert("This feedback is already added as context.");
		} else {
			$$invalidate(18, context = feedback);
		}
	}

	async function addDocument(event) {
		const files = event.target.files;

		if (files) {
			for (const file of files) {
				const formData = new FormData();
				formData.append("file", file);
				$$invalidate(28, document_load_progress = 50);
				$$invalidate(27, document_load_status = "Adding document... (this may take a while)");
				const response = await fetch("/add_document", { method: "POST", body: formData });

				if (!response.ok) {
					return null;
				}

				const json = await response.json();
				let document_name = json["document_name"];
				documents.push(document_name);
				$$invalidate(1, documents);
				$$invalidate(27, document_load_status = "Done!");
				$$invalidate(28, document_load_progress = 100);
				await pause(1200);
			}
		}
	}

	async function deleteDocument(title, idx) {
		const response = await fetch("/delete_document", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ title })
		});

		if (!response.ok) {
			return console.log(`Failed to delete document ${title}`);
		}

		// Remove document at idx
		documents.splice(idx, 1);

		$$invalidate(1, documents);
		return title;
	}

	async function deleteAllDocuments() {
		$$invalidate(27, document_load_status = "Removing all documents...");

		for (let i = 0; i < documents.length; i++) {
			let doc = documents[i];
			$$invalidate(28, document_load_progress = i / documents.length * 100);

			try {
				await deleteDocument(doc, i);
			} catch(error) {
				console.error(`Error deleting document ${doc}:`, error);
			} // Optionally, break the loop or continue to the next document
		}

		if (documents.length === 1) {
			await deleteDocument(documents[0], 0);
		}

		$$invalidate(27, document_load_status = "Done!");
		$$invalidate(28, document_load_progress = 100);
		await pause(1000);
		$$invalidate(28, document_load_progress = 0);
	}

	let adding_note = false;
	let temp_note = "";

	async function addNote(note, feedback_id = null, image_url = null) {
		if (note.trim() == "") {
			alert("Please enter a note.");
			return;
		}

		if (feedback_id) {
			if (feedback_id in feedback_notes) {
				feedback_notes[feedback_id].notes.push(note);
				$$invalidate(4, feedback_notes);
			} else {
				$$invalidate(
					4,
					feedback_notes[feedback_id] = { notes: [note], is_adding: false },
					feedback_notes
				);
			} // image_url ? feedback_notes[feedback_id].image = image_url : null;
		} else {
			my_notes.push(note);
			$$invalidate(3, my_notes);
		}
	}

	async function removeNote(note_idx, feedback_id = null) {
		if (feedback_id) {
			feedback_notes[feedback_id].notes.splice(note_idx, 1);
			$$invalidate(4, feedback_notes);
		} else {
			my_notes.splice(note_idx, 1);
			$$invalidate(3, my_notes);
		}
	}

	async function confirmNote(feedback_id = null) {
		$$invalidate(32, adding_note = false);
		addNote(temp_note, feedback_id);
		$$invalidate(33, temp_note = "");
	}

	$$self.$$.on_mount.push(function () {
		if (feedback_list === undefined && !('feedback_list' in $$props || $$self.$$.bound[$$self.$$.props['feedback_list']])) {
			console_1.warn("<FeedbackList> was created without expected prop 'feedback_list'");
		}

		if (recording === undefined && !('recording' in $$props || $$self.$$.bound[$$self.$$.props['recording']])) {
			console_1.warn("<FeedbackList> was created without expected prop 'recording'");
		}
	});

	const writable_props = [
		'feedback_list',
		'recording',
		'documents',
		'chatbot_messages',
		'my_notes',
		'feedback_notes',
		'left_display_styles'
	];

	Object_1$1.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<FeedbackList> was created with unknown prop '${key}'`);
	});

	const click_handler = async i => {
		$$invalidate(17, active_left_tab = i);
		await logAction("FeedbackList: Switched left panel tab", left_panel_tabs[active_left_tab]);
	};

	const click_handler_1 = async () => {
		$$invalidate(5, left_display_styles[active_left_tab] = "row", left_display_styles);
		await logAction("FeedbackList: Switched left panel display style", "row");
	};

	const click_handler_2 = async () => {
		$$invalidate(5, left_display_styles[active_left_tab] = "grid", left_display_styles);
		await logAction("FeedbackList: Switched left panel display style", "grid");
	};

	const click_handler_3 = async feedback => {
		$$invalidate(16, active_right_tab = 0);

		if ("excerpt_reference" in feedback) {
			if ("start_timestamp" in feedback.excerpt_reference) {
				seekTo(feedback.excerpt_reference.start_timestamp, mediaPlayer);
				await logAction("FeedbackList: Seeked to timestamp", feedback.excerpt_reference.start_timestamp);
			}
		}
	};

	const click_handler_4 = async (feedback, each_value_9, i) => {
		$$invalidate(0, each_value_9[i].positivised_quote = await paraphrasePositively(feedback.quote, feedback.excerpt_reference.dialogue), feedback_list);
		showParaphrasedQuote(feedback, true);
		$$invalidate(0, feedback_list);
		await logAction("FeedbackList: Positivize Quote", feedback);
	};

	const click_handler_5 = async feedback => {
		$$invalidate(16, active_right_tab = 1);
		addContext(feedback);
		await logAction("FeedbackList: Select as context", context);
	};

	const click_handler_6 = async feedback => {
		$$invalidate(16, active_right_tab = 2);

		if (feedback.id in feedback_notes) {
			$$invalidate(4, feedback_notes[feedback.id].is_adding = true, feedback_notes);
		} else {
			$$invalidate(4, feedback_notes[feedback.id] = { notes: [], is_adding: true }, feedback_notes);
		}
	};

	const click_handler_7 = async feedback => {
		removeFeedback(feedback);
		await saveFeedbackList(feedback_list);
		await logAction("FeedbackList: Remove critical feedback", feedback);
	};

	function input_change_handler(each_value_9, i) {
		each_value_9[i].done = this.checked;
		$$invalidate(0, feedback_list);
	}

	const click_handler_8 = async feedback => {
		showParaphrasedQuote(feedback, false);
		await logAction("FeedbackList: Show original quote", feedback.original_quote);
	};

	const click_handler_9 = async feedback => {
		showParaphrasedQuote(feedback, true);
		await logAction("FeedbackList: Show paraphrased quote", feedback.positivised_quote);
	};

	const click_handler_10 = async (feedback, event) => {
		selectFeedback(feedback, event);
		focusOnFeedback(feedback);
		await logAction("FeedbackList: Selected feedback", feedback);
	};

	const click_handler_11 = async () => {
		sortFeedbackList('id');
		await logAction("FeedbackList: Sorted feedback", 'id');
	};

	const click_handler_12 = async () => {
		sortFeedbackList('quote');
		await logAction("FeedbackList: Sorted feedback", 'quote');
	};

	const click_handler_13 = async () => {
		sortFeedbackList('speaker');
		await logAction("FeedbackList: Sorted feedback", 'speaker');
	};

	const click_handler_14 = async () => {
		sortFeedbackList('done');
		await logAction("FeedbackList: Sorted feedback", 'done');
	};

	const click_handler_15 = async feedback => {
		$$invalidate(16, active_right_tab = 0);

		if ("excerpt_reference" in feedback) {
			if ("start_timestamp" in feedback.excerpt_reference) {
				seekTo(feedback.excerpt_reference.start_timestamp, mediaPlayer);
				await logAction("FeedbackList: Seeked to timestamp", feedback.excerpt_reference.start_timestamp);
			}
		}
	};

	const click_handler_16 = async feedback => {
		showParaphrasedQuote(feedback, false);
		await logAction("FeedbackList: Show original quote", feedback.original_quote);
	};

	const click_handler_17 = async feedback => {
		showParaphrasedQuote(feedback, true);
		await logAction("FeedbackList: Show paraphrased quote", feedback.positivised_quote);
	};

	const click_handler_18 = async (feedback, each_value_10, i) => {
		$$invalidate(0, each_value_10[i].positivised_quote = await paraphrasePositively(feedback.quote, feedback.excerpt_reference.dialogue), feedback_list);
		showParaphrasedQuote(feedback, true);
		$$invalidate(0, feedback_list);
		await logAction("FeedbackList: Positivize Quote", feedback);
	};

	const click_handler_19 = async feedback => {
		$$invalidate(16, active_right_tab = 1);
		addContext(feedback);
		await logAction("FeedbackList: Select as context", context);
	};

	const click_handler_20 = async feedback => {
		$$invalidate(16, active_right_tab = 2);

		if (feedback.id in feedback_notes) {
			$$invalidate(4, feedback_notes[feedback.id].is_adding = true, feedback_notes);
		} else {
			$$invalidate(4, feedback_notes[feedback.id] = { notes: [], is_adding: true }, feedback_notes);
		}
	};

	const click_handler_21 = async feedback => {
		let confirm = window.confirm("Are you sure you want to delete this feedback? This cannot be undone.");

		if (!confirm) {
			return;
		}

		removeFeedback(feedback);
		await saveFeedbackList(feedback_list);
		await logAction("FeedbackList: Remove critical feedback", feedback);
	};

	function input_change_handler_1(each_value_10, i) {
		each_value_10[i].done = this.checked;
		$$invalidate(0, feedback_list);
	}

	const click_handler_22 = async (feedback, event) => {
		selectFeedback(feedback, event);
		focusOnFeedback(feedback);
		await logAction("FeedbackList: Selected feedback", feedback);
	};

	const click_handler_23 = async feedback => {
		$$invalidate(16, active_right_tab = 0);

		if ("excerpt_reference" in feedback) {
			if ("start_timestamp" in feedback.excerpt_reference) {
				seekTo(feedback.excerpt_reference.start_timestamp, mediaPlayer);
				await logAction("FeedbackList: Seeked to timestamp", feedback.excerpt_reference.start_timestamp);
			}
		}
	};

	const click_handler_24 = async (feedback, each_value_11, i) => {
		$$invalidate(0, each_value_11[i].positivised_quote = await paraphrasePositively(feedback.quote, feedback.excerpt_reference.dialogue), feedback_list);
		showParaphrasedQuote(feedback, true);
		$$invalidate(0, feedback_list);
		await logAction("FeedbackList: Positivize Quote", feedback);
	};

	const click_handler_25 = async feedback => {
		$$invalidate(16, active_right_tab = 1);
		addContext(feedback);
		await logAction("FeedbackList: Select as context", context);
	};

	const click_handler_26 = async feedback => {
		$$invalidate(16, active_right_tab = 2);

		if (feedback.id in feedback_notes) {
			$$invalidate(4, feedback_notes[feedback.id].is_adding = true, feedback_notes);
		} else {
			$$invalidate(4, feedback_notes[feedback.id] = { notes: [], is_adding: true }, feedback_notes);
		}
	};

	const click_handler_27 = async feedback => {
		removeFeedback(feedback);
		await saveFeedbackList(feedback_list);
		await logAction("FeedbackList: Remove positive feedback", feedback);
	};

	const click_handler_28 = async feedback => {
		showParaphrasedQuote(feedback, false);
		await logAction("FeedbackList: Show original quote", feedback.original_quote);
	};

	const click_handler_29 = async feedback => {
		showParaphrasedQuote(feedback, true);
		await logAction("FeedbackList: Show paraphrased quote", feedback.positivised_quote);
	};

	const click_handler_30 = async (feedback, event) => {
		selectFeedback(feedback, event);
		focusOnFeedback(feedback);
		await logAction("FeedbackList: Selected feedback", feedback);
	};

	const click_handler_31 = async () => {
		sortFeedbackList('id');
		await logAction("FeedbackList: Sorted feedback", 'id');
	};

	const click_handler_32 = async () => {
		sortFeedbackList('quote');
		await logAction("FeedbackList: Sorted feedback", 'quote');
	};

	const click_handler_33 = async () => {
		sortFeedbackList('speaker');
		await logAction("FeedbackList: Sorted feedback", 'speaker');
	};

	const click_handler_34 = async feedback => {
		$$invalidate(16, active_right_tab = 0);

		if ("excerpt_reference" in feedback) {
			if ("start_timestamp" in feedback.excerpt_reference) {
				seekTo(feedback.excerpt_reference.start_timestamp, mediaPlayer);
				await logAction("FeedbackList: Seeked to timestamp", feedback.excerpt_reference.start_timestamp);
			}
		}
	};

	const click_handler_35 = async feedback => {
		showParaphrasedQuote(feedback, false);
		await logAction("FeedbackList: Show original quote", feedback.original_quote);
	};

	const click_handler_36 = async feedback => {
		showParaphrasedQuote(feedback, true);
		await logAction("FeedbackList: Show paraphrased quote", feedback.positivised_quote);
	};

	const click_handler_37 = async (feedback, each_value_12, i) => {
		$$invalidate(0, each_value_12[i].positivised_quote = await paraphrasePositively(feedback.quote, feedback.excerpt_reference.dialogue), feedback_list);
		showParaphrasedQuote(feedback, true);
		$$invalidate(0, feedback_list);
		await logAction("FeedbackList: Positivize Quote", feedback);
	};

	const click_handler_38 = async feedback => {
		$$invalidate(16, active_right_tab = 1);
		addContext(feedback);
		await logAction("FeedbackList: Select as context", context);
	};

	const click_handler_39 = async feedback => {
		$$invalidate(16, active_right_tab = 2);

		if (feedback.id in feedback_notes) {
			$$invalidate(4, feedback_notes[feedback.id].is_adding = true, feedback_notes);
		} else {
			$$invalidate(4, feedback_notes[feedback.id] = { notes: [], is_adding: true }, feedback_notes);
		}
	};

	const click_handler_40 = async feedback => {
		let confirm = window.confirm("Are you sure you want to delete this feedback? This cannot be undone.");

		if (!confirm) {
			return;
		}

		removeFeedback(feedback);
		await saveFeedbackList(feedback_list);
		await logAction("FeedbackList: Remove positive feedback", feedback);
	};

	const click_handler_41 = async (feedback, event) => {
		selectFeedback(feedback, event);
		focusOnFeedback(feedback);
		await logAction("FeedbackList: Selected feedback", feedback);
	};

	const click_handler_42 = async i => {
		$$invalidate(16, active_right_tab = i);
		await logAction("FeedbackList: Switched right panel tab", right_panel_tabs[active_right_tab]);
	};

	function video_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			mediaPlayer = $$value;
			$$invalidate(11, mediaPlayer);
		});
	}

	function audio_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			mediaPlayer = $$value;
			$$invalidate(11, mediaPlayer);
		});
	}

	function video_binding_1($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			mediaPlayer = $$value;
			$$invalidate(11, mediaPlayer);
		});
	}

	const click_handler_43 = async excerpt => {
		seekTo(excerpt.start_timestamp, mediaPlayer);
		await logAction("FeedbackList: Seek to start timestamp", excerpt.start_timestamp);
	};

	const click_handler_44 = async excerpt => {
		seekTo(excerpt.end_timestamp, mediaPlayer);
		await logAction("FeedbackList: Seek to end timestamp", excerpt.end_timestamp);
	};

	function select_change_handler() {
		selected_chatbot = select_value(this);
		$$invalidate(8, selected_chatbot);
		$$invalidate(34, chatbot_models);
	}

	const click_handler_45 = async () => {
		$$invalidate(7, show_chatbot_settings = !show_chatbot_settings);
		await logAction("FeedbackList: Toggled chatbot settings", show_chatbot_settings);
	};

	const click_handler_46 = async message => {
		$$invalidate(16, active_right_tab = 2);
		addNote(message.role + ": " + message.content);
		await saveMyNotes(my_notes);
		await logAction("FeedbackList: Added note to My Notes", message);
	};

	const click_handler_47 = async message => {
		$$invalidate(16, active_right_tab = 2);
		addNote(message.role + ": " + message.content, "id" in message.context ? message.context.id : null);
		await saveMyFeedbackNotes(feedback_notes);
		await logAction("FeedbackList: Added note to Feedback ID" + message.context.id, message);
	};

	const click_handler_48 = async message => {
		// navigator.clipboard.writeText(message.role+": "+message.content);
		copy(message.role + ": " + message.content);

		await logAction("FeedbackList: Copied message", message);
	};

	const click_handler_49 = async message => {
		let confirm = window.confirm("Are you sure you want to delete this message? This cannot be undone.");

		if (!confirm) {
			return;
		}

		// Get index of assistant message in chatbot_messages. Delete assistant message too. 
		//BUG: NOt being deleted
		let idx = chatbot_messages.indexOf(message);

		let assistant_idx = idx + 1;
		let assistant_message = chatbot_messages[assistant_idx];

		await fetch("/remove_from_backend_chatbot_messages", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				user_message_idx: idx,
				assistant_message_idx: assistant_idx
			})
		});

		$$invalidate(2, chatbot_messages = chatbot_messages.filter(m => m !== message));

		if (assistant_message.role === "assistant") {
			$$invalidate(2, chatbot_messages = chatbot_messages.filter(m => m !== assistant_message));
		}

		$$invalidate(2, chatbot_messages);
		await saveDisplayChatbotMessages(chatbot_messages);
		await logAction("FeedbackList: Removed message", message);
	};

	function loadingbar_progress_binding(value) {
		chatbot_load_progress = value;
		$$invalidate(26, chatbot_load_progress);
	}

	function loadingbar_status_binding(value) {
		chatbot_load_status = value;
		$$invalidate(25, chatbot_load_status);
	}

	const click_handler_50 = async () => {
		await logAction("FeedbackList: Removed context", context);
		$$invalidate(18, context = null);
	};

	const click_handler_51 = async () => {
		if (!is_loading) {
			await sendMessage("Can you explain the following feedback?", context);
		}
	};

	const click_handler_52 = async () => {
		if (!is_loading) {
			await sendMessage("Can you brainstorm a set of actions to address the following feedback?", context);
		}
	};

	function input0_change_handler() {
		referToTranscript = this.checked;
		$$invalidate(13, referToTranscript);
	}

	function input1_change_handler() {
		referToDocuments = this.checked;
		$$invalidate(14, referToDocuments);
	}

	const click_handler_53 = async () => {
		await logAction("FeedbackList: Removed image", image_url);
		$$invalidate(20, image_url = null);
		$$invalidate(19, selected_image = null);
	};

	function input2_change_handler() {
		image_files = this.value;
		$$invalidate(21, image_files);
	}

	function input2_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			image_input = $$value;
			$$invalidate(22, image_input);
		});
	}

	const change_handler = async () => {
		$$invalidate(21, image_files = image_input.files);
		$$invalidate(20, [image_url, selected_image] = await handleImageUpload(image_files), image_url, $$invalidate(19, selected_image));

		await logAction(
			image_url
			? "FeedbackList: Uploaded image"
			: "FeedbackList: Canceled uploading image",
			image_url
		);
	};

	const click_handler_54 = async () => {
		// Add image
		image_input.click();
	};

	function textarea_input_handler() {
		inputMessage = this.value;
		$$invalidate(12, inputMessage);
	}

	const keydown_handler = e => e.key === 'Enter' && sendMessage(inputMessage, context);

	const click_handler_55 = async () => {
		await sendMessage(inputMessage, context);
		$$invalidate(12, inputMessage = "");
	};

	function select_change_handler_1() {
		selected_chatbot = select_value(this);
		$$invalidate(8, selected_chatbot);
		$$invalidate(34, chatbot_models);
	}

	function range0_value_binding(value) {
		chatbot_temperature = value;
		$$invalidate(9, chatbot_temperature);
	}

	function range1_value_binding(value) {
		chatbot_max_output_tokens = value;
		$$invalidate(10, chatbot_max_output_tokens);
	}

	function loadingbar_progress_binding_1(value) {
		document_load_progress = value;
		$$invalidate(28, document_load_progress);
	}

	function loadingbar_status_binding_1(value) {
		document_load_status = value;
		$$invalidate(27, document_load_status);
	}

	const click_handler_56 = async (doc, i) => {
		let confirm = window.confirm("Are you sure you want to delete this document? This cannot be undone.");

		if (!confirm) {
			return;
		}

		$$invalidate(29, is_document_loading = true);
		$$invalidate(28, document_load_progress = 50);
		$$invalidate(27, document_load_status = "Removing document...");
		let result = await deleteDocument(doc, i);
		$$invalidate(27, document_load_status = "Done!");
		$$invalidate(28, document_load_progress = 100);
		$$invalidate(29, is_document_loading = false);
		logAction("FeedbackList: Removed document", result);
	};

	function input_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			document_file_input = $$value;
			$$invalidate(23, document_file_input);
		});
	}

	const change_handler_1 = async e => {
		$$invalidate(29, is_document_loading = true);
		await addDocument(e);
		$$invalidate(29, is_document_loading = false);
		await logAction("FeedbackList: Added document", e.target.files);
	};

	const click_handler_57 = async () => {
		// Add document
		let confirm = window.confirm("Adding a new document will take a long time, since its information will be extracted. Do you want to proceed?");

		if (!confirm) {
			return;
		}

		document.getElementById("document_file_input").click();
		await logAction("FeedbackList: Added document", "Document");
	};

	const click_handler_58 = async () => {
		// Remove all documents
		let confirm = window.confirm("Are you sure you want to remove all documents? This cannot be undone.");

		if (!confirm) {
			return;
		}

		$$invalidate(29, is_document_loading = true);
		await deleteAllDocuments();
		$$invalidate(29, is_document_loading = false);
		await logAction("FeedbackList: Removed all documents", documents);
	};

	const click_handler_59 = async (i, note) => {
		removeNote(i);
		await saveMyNotes(my_notes);
		await logAction("FeedbackList: Removed note", note);
	};

	function input_input_handler() {
		temp_note = this.value;
		$$invalidate(33, temp_note);
	}

	const click_handler_60 = async () => {
		confirmNote();
		$$invalidate(32, adding_note = false);
		await saveMyNotes(my_notes);
		await logAction("FeedbackList: Added note to My Notes", temp_note);
	};

	const click_handler_61 = async () => {
		$$invalidate(32, adding_note = false);
		$$invalidate(33, temp_note = "");
		await logAction("FeedbackList: Cancelled adding note to My Notes", temp_note);
	};

	const click_handler_62 = async () => {
		$$invalidate(32, adding_note = true);
		await logAction("FeedbackList: Clicked on My Notes' Add Note button", adding_note);
	};

	const click_handler_63 = async () => {
		let confirm = window.confirm("Are you sure you want to delete all notes? This cannot be undone.");

		if (!confirm) {
			return;
		}

		$$invalidate(3, my_notes = []);
		$$invalidate(3, my_notes);
		await saveMyNotes(my_notes);
		await logAction("FeedbackList: Removed all notes from My Notes", my_notes);
	};

	const click_handler_64 = async key => {
		let string = "Are you sure you want to delete this feedback notes section? This cannot be undone";

		if (feedback_notes[key].notes.length > 0) {
			string = "Are you sure you want to delete this feedback notes section? This will delete all notes and cannot be undone.";
		}

		let confirm = window.confirm(string);

		if (!confirm) {
			return;
		}

		delete feedback_notes[key];
		$$invalidate(4, feedback_notes);
		await saveMyFeedbackNotes(feedback_notes);
		await logAction("FeedbackList: Removed feedback notes section", "Feedback ID" + key);
	};

	const click_handler_65 = async (i, key, note) => {
		removeNote(i, key);
		await saveMyFeedbackNotes(feedback_notes);
		await logAction("FeedbackList: Removed note from Feedback ID" + key, note);
	};

	function input_input_handler_1() {
		temp_note = this.value;
		$$invalidate(33, temp_note);
	}

	const click_handler_66 = async key => {
		confirmNote(key);
		$$invalidate(4, feedback_notes[key].is_adding = false, feedback_notes);
		await saveMyFeedbackNotes(feedback_notes);
		await logAction("FeedbackList: Added note to Feedback ID" + key, temp_note);
	};

	const click_handler_67 = async key => {
		$$invalidate(4, feedback_notes[key].is_adding = false, feedback_notes);
		await logAction("FeedbackList: Cancelled adding note to Feedback ID" + key, temp_note);
		$$invalidate(33, temp_note = "");
	};

	const click_handler_68 = async key => {
		$$invalidate(4, feedback_notes[key].is_adding = true, feedback_notes);
		await logAction("FeedbackList: Clicked on Feedback ID" + key + "'s Add Note button", feedback_notes[key].is_adding);
	};

	const click_handler_69 = async key => {
		let confirm = window.confirm("Are you sure you want to delete all notes? This cannot be undone.");

		if (!confirm) {
			return;
		}

		$$invalidate(4, feedback_notes[key].notes = [], feedback_notes);
		$$invalidate(4, feedback_notes);
		await saveMyFeedbackNotes(feedback_notes);
		await logAction("FeedbackList: Removed all notes from Feedback ID" + key, feedback_notes[key].notes);
	};

	$$self.$$set = $$props => {
		if ('feedback_list' in $$props) $$invalidate(0, feedback_list = $$props.feedback_list);
		if ('recording' in $$props) $$invalidate(6, recording = $$props.recording);
		if ('documents' in $$props) $$invalidate(1, documents = $$props.documents);
		if ('chatbot_messages' in $$props) $$invalidate(2, chatbot_messages = $$props.chatbot_messages);
		if ('my_notes' in $$props) $$invalidate(3, my_notes = $$props.my_notes);
		if ('feedback_notes' in $$props) $$invalidate(4, feedback_notes = $$props.feedback_notes);
		if ('left_display_styles' in $$props) $$invalidate(5, left_display_styles = $$props.left_display_styles);
	};

	$$self.$capture_state = () => ({
		onMount,
		prevent_default,
		seekTo,
		focusOnFeedback,
		logAction,
		pause,
		focusOnFeedbackNote,
		copy,
		convertImageToBase64,
		saveBase64Image,
		saveFeedbackList,
		saveDisplayChatbotMessages,
		saveMyNotes,
		saveMyFeedbackNotes,
		LoadingBar,
		Range,
		SvelteMarkdown,
		feedback_list,
		recording,
		documents,
		chatbot_messages,
		my_notes,
		feedback_notes,
		left_display_styles,
		show_chatbot_settings,
		chatbot_models,
		selected_chatbot,
		chatbot_temperature,
		chatbot_max_output_tokens,
		mediaPlayer,
		inputMessage,
		referToTranscript,
		referToDocuments,
		selected_feedback,
		active_right_tab,
		active_left_tab,
		context,
		selected_image,
		image_url,
		image_files,
		image_input,
		document_files,
		document_file_input,
		left_panel_tabs,
		right_panel_tabs,
		is_loading,
		chatbot_load_status,
		chatbot_load_progress,
		ld_bar_chatbot,
		document_load_status,
		document_load_progress,
		is_document_loading,
		handleImageUpload,
		paraphrasePositively,
		removeFeedback,
		selectFeedback,
		deselectFeedback,
		showParaphrasedQuote,
		generateTask,
		sortKey,
		sortAscending,
		sortFeedbackList,
		sendMessage,
		addContext,
		addDocument,
		deleteDocument,
		deleteAllDocuments,
		adding_note,
		temp_note,
		addNote,
		removeNote,
		confirmNote
	});

	$$self.$inject_state = $$props => {
		if ('feedback_list' in $$props) $$invalidate(0, feedback_list = $$props.feedback_list);
		if ('recording' in $$props) $$invalidate(6, recording = $$props.recording);
		if ('documents' in $$props) $$invalidate(1, documents = $$props.documents);
		if ('chatbot_messages' in $$props) $$invalidate(2, chatbot_messages = $$props.chatbot_messages);
		if ('my_notes' in $$props) $$invalidate(3, my_notes = $$props.my_notes);
		if ('feedback_notes' in $$props) $$invalidate(4, feedback_notes = $$props.feedback_notes);
		if ('left_display_styles' in $$props) $$invalidate(5, left_display_styles = $$props.left_display_styles);
		if ('show_chatbot_settings' in $$props) $$invalidate(7, show_chatbot_settings = $$props.show_chatbot_settings);
		if ('chatbot_models' in $$props) $$invalidate(34, chatbot_models = $$props.chatbot_models);
		if ('selected_chatbot' in $$props) $$invalidate(8, selected_chatbot = $$props.selected_chatbot);
		if ('chatbot_temperature' in $$props) $$invalidate(9, chatbot_temperature = $$props.chatbot_temperature);
		if ('chatbot_max_output_tokens' in $$props) $$invalidate(10, chatbot_max_output_tokens = $$props.chatbot_max_output_tokens);
		if ('mediaPlayer' in $$props) $$invalidate(11, mediaPlayer = $$props.mediaPlayer);
		if ('inputMessage' in $$props) $$invalidate(12, inputMessage = $$props.inputMessage);
		if ('referToTranscript' in $$props) $$invalidate(13, referToTranscript = $$props.referToTranscript);
		if ('referToDocuments' in $$props) $$invalidate(14, referToDocuments = $$props.referToDocuments);
		if ('selected_feedback' in $$props) $$invalidate(15, selected_feedback = $$props.selected_feedback);
		if ('active_right_tab' in $$props) $$invalidate(16, active_right_tab = $$props.active_right_tab);
		if ('active_left_tab' in $$props) $$invalidate(17, active_left_tab = $$props.active_left_tab);
		if ('context' in $$props) $$invalidate(18, context = $$props.context);
		if ('selected_image' in $$props) $$invalidate(19, selected_image = $$props.selected_image);
		if ('image_url' in $$props) $$invalidate(20, image_url = $$props.image_url);
		if ('image_files' in $$props) $$invalidate(21, image_files = $$props.image_files);
		if ('image_input' in $$props) $$invalidate(22, image_input = $$props.image_input);
		if ('document_files' in $$props) document_files = $$props.document_files;
		if ('document_file_input' in $$props) $$invalidate(23, document_file_input = $$props.document_file_input);
		if ('left_panel_tabs' in $$props) $$invalidate(35, left_panel_tabs = $$props.left_panel_tabs);
		if ('right_panel_tabs' in $$props) $$invalidate(36, right_panel_tabs = $$props.right_panel_tabs);
		if ('is_loading' in $$props) $$invalidate(24, is_loading = $$props.is_loading);
		if ('chatbot_load_status' in $$props) $$invalidate(25, chatbot_load_status = $$props.chatbot_load_status);
		if ('chatbot_load_progress' in $$props) $$invalidate(26, chatbot_load_progress = $$props.chatbot_load_progress);
		if ('ld_bar_chatbot' in $$props) ld_bar_chatbot = $$props.ld_bar_chatbot;
		if ('document_load_status' in $$props) $$invalidate(27, document_load_status = $$props.document_load_status);
		if ('document_load_progress' in $$props) $$invalidate(28, document_load_progress = $$props.document_load_progress);
		if ('is_document_loading' in $$props) $$invalidate(29, is_document_loading = $$props.is_document_loading);
		if ('sortKey' in $$props) $$invalidate(30, sortKey = $$props.sortKey);
		if ('sortAscending' in $$props) $$invalidate(31, sortAscending = $$props.sortAscending);
		if ('adding_note' in $$props) $$invalidate(32, adding_note = $$props.adding_note);
		if ('temp_note' in $$props) $$invalidate(33, temp_note = $$props.temp_note);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		feedback_list,
		documents,
		chatbot_messages,
		my_notes,
		feedback_notes,
		left_display_styles,
		recording,
		show_chatbot_settings,
		selected_chatbot,
		chatbot_temperature,
		chatbot_max_output_tokens,
		mediaPlayer,
		inputMessage,
		referToTranscript,
		referToDocuments,
		selected_feedback,
		active_right_tab,
		active_left_tab,
		context,
		selected_image,
		image_url,
		image_files,
		image_input,
		document_file_input,
		is_loading,
		chatbot_load_status,
		chatbot_load_progress,
		document_load_status,
		document_load_progress,
		is_document_loading,
		sortKey,
		sortAscending,
		adding_note,
		temp_note,
		chatbot_models,
		left_panel_tabs,
		right_panel_tabs,
		removeFeedback,
		selectFeedback,
		deselectFeedback,
		sortFeedbackList,
		sendMessage,
		addContext,
		addDocument,
		deleteDocument,
		deleteAllDocuments,
		addNote,
		removeNote,
		confirmNote,
		click_handler,
		click_handler_1,
		click_handler_2,
		click_handler_3,
		click_handler_4,
		click_handler_5,
		click_handler_6,
		click_handler_7,
		input_change_handler,
		click_handler_8,
		click_handler_9,
		click_handler_10,
		click_handler_11,
		click_handler_12,
		click_handler_13,
		click_handler_14,
		click_handler_15,
		click_handler_16,
		click_handler_17,
		click_handler_18,
		click_handler_19,
		click_handler_20,
		click_handler_21,
		input_change_handler_1,
		click_handler_22,
		click_handler_23,
		click_handler_24,
		click_handler_25,
		click_handler_26,
		click_handler_27,
		click_handler_28,
		click_handler_29,
		click_handler_30,
		click_handler_31,
		click_handler_32,
		click_handler_33,
		click_handler_34,
		click_handler_35,
		click_handler_36,
		click_handler_37,
		click_handler_38,
		click_handler_39,
		click_handler_40,
		click_handler_41,
		click_handler_42,
		video_binding,
		audio_binding,
		video_binding_1,
		click_handler_43,
		click_handler_44,
		select_change_handler,
		click_handler_45,
		click_handler_46,
		click_handler_47,
		click_handler_48,
		click_handler_49,
		loadingbar_progress_binding,
		loadingbar_status_binding,
		click_handler_50,
		click_handler_51,
		click_handler_52,
		input0_change_handler,
		input1_change_handler,
		click_handler_53,
		input2_change_handler,
		input2_binding,
		change_handler,
		click_handler_54,
		textarea_input_handler,
		keydown_handler,
		click_handler_55,
		select_change_handler_1,
		range0_value_binding,
		range1_value_binding,
		loadingbar_progress_binding_1,
		loadingbar_status_binding_1,
		click_handler_56,
		input_binding,
		change_handler_1,
		click_handler_57,
		click_handler_58,
		click_handler_59,
		input_input_handler,
		click_handler_60,
		click_handler_61,
		click_handler_62,
		click_handler_63,
		click_handler_64,
		click_handler_65,
		input_input_handler_1,
		click_handler_66,
		click_handler_67,
		click_handler_68,
		click_handler_69
	];
}

class FeedbackList extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$1(
			this,
			options,
			instance$1,
			create_fragment$1,
			safe_not_equal,
			{
				feedback_list: 0,
				recording: 6,
				documents: 1,
				chatbot_messages: 2,
				my_notes: 3,
				feedback_notes: 4,
				left_display_styles: 5
			},
			null,
			[-1, -1, -1, -1, -1, -1]
		);

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "FeedbackList",
			options,
			id: create_fragment$1.name
		});
	}

	get feedback_list() {
		throw new Error_1$1("<FeedbackList>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set feedback_list(value) {
		throw new Error_1$1("<FeedbackList>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get recording() {
		throw new Error_1$1("<FeedbackList>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set recording(value) {
		throw new Error_1$1("<FeedbackList>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get documents() {
		throw new Error_1$1("<FeedbackList>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set documents(value) {
		throw new Error_1$1("<FeedbackList>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get chatbot_messages() {
		throw new Error_1$1("<FeedbackList>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set chatbot_messages(value) {
		throw new Error_1$1("<FeedbackList>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get my_notes() {
		throw new Error_1$1("<FeedbackList>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set my_notes(value) {
		throw new Error_1$1("<FeedbackList>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get feedback_notes() {
		throw new Error_1$1("<FeedbackList>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set feedback_notes(value) {
		throw new Error_1$1("<FeedbackList>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get left_display_styles() {
		throw new Error_1$1("<FeedbackList>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set left_display_styles(value) {
		throw new Error_1$1("<FeedbackList>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var isMergeableObject = function isMergeableObject(value) {
	return isNonNullObject(value)
		&& !isSpecial(value)
};

function isNonNullObject(value) {
	return !!value && typeof value === 'object'
}

function isSpecial(value) {
	var stringValue = Object.prototype.toString.call(value);

	return stringValue === '[object RegExp]'
		|| stringValue === '[object Date]'
		|| isReactElement(value)
}

// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

function isReactElement(value) {
	return value.$$typeof === REACT_ELEMENT_TYPE
}

function emptyTarget(val) {
	return Array.isArray(val) ? [] : {}
}

function cloneUnlessOtherwiseSpecified(value, options) {
	return (options.clone !== false && options.isMergeableObject(value))
		? deepmerge(emptyTarget(value), value, options)
		: value
}

function defaultArrayMerge(target, source, options) {
	return target.concat(source).map(function(element) {
		return cloneUnlessOtherwiseSpecified(element, options)
	})
}

function getMergeFunction(key, options) {
	if (!options.customMerge) {
		return deepmerge
	}
	var customMerge = options.customMerge(key);
	return typeof customMerge === 'function' ? customMerge : deepmerge
}

function getEnumerableOwnPropertySymbols(target) {
	return Object.getOwnPropertySymbols
		? Object.getOwnPropertySymbols(target).filter(function(symbol) {
			return Object.propertyIsEnumerable.call(target, symbol)
		})
		: []
}

function getKeys(target) {
	return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target))
}

function propertyIsOnObject(object, property) {
	try {
		return property in object
	} catch(_) {
		return false
	}
}

// Protects from prototype poisoning and unexpected merging up the prototype chain.
function propertyIsUnsafe(target, key) {
	return propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,
		&& !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
			&& Object.propertyIsEnumerable.call(target, key)) // and also unsafe if they're nonenumerable.
}

function mergeObject(target, source, options) {
	var destination = {};
	if (options.isMergeableObject(target)) {
		getKeys(target).forEach(function(key) {
			destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
		});
	}
	getKeys(source).forEach(function(key) {
		if (propertyIsUnsafe(target, key)) {
			return
		}

		if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
			destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
		} else {
			destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
		}
	});
	return destination
}

function deepmerge(target, source, options) {
	options = options || {};
	options.arrayMerge = options.arrayMerge || defaultArrayMerge;
	options.isMergeableObject = options.isMergeableObject || isMergeableObject;
	// cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
	// implementations can use it. The caller may not replace it.
	options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;

	var sourceIsArray = Array.isArray(source);
	var targetIsArray = Array.isArray(target);
	var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

	if (!sourceAndTargetTypesMatch) {
		return cloneUnlessOtherwiseSpecified(source, options)
	} else if (sourceIsArray) {
		return options.arrayMerge(target, source, options)
	} else {
		return mergeObject(target, source, options)
	}
}

deepmerge.all = function deepmergeAll(array, options) {
	if (!Array.isArray(array)) {
		throw new Error('first argument should be an array')
	}

	return array.reduce(function(prev, next) {
		return deepmerge(prev, next, options)
	}, {})
};

var deepmerge_1 = deepmerge;

var cjs = deepmerge_1;

var deepmerge$1 = /*@__PURE__*/getDefaultExportFromCjs(cjs);

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */

var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
      function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
  return extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() { this.constructor = d; }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
  __assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
  };
  return __assign.apply(this, arguments);
};

function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
              t[p[i]] = s[p[i]];
      }
  return t;
}

function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
      }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

//
// Main
//
function memoize(fn, options) {
    var cache = options && options.cache ? options.cache : cacheDefault;
    var serializer = options && options.serializer ? options.serializer : serializerDefault;
    var strategy = options && options.strategy ? options.strategy : strategyDefault;
    return strategy(fn, {
        cache: cache,
        serializer: serializer,
    });
}
//
// Strategy
//
function isPrimitive(value) {
    return (value == null || typeof value === 'number' || typeof value === 'boolean'); // || typeof value === "string" 'unsafe' primitive for our needs
}
function monadic(fn, cache, serializer, arg) {
    var cacheKey = isPrimitive(arg) ? arg : serializer(arg);
    var computedValue = cache.get(cacheKey);
    if (typeof computedValue === 'undefined') {
        computedValue = fn.call(this, arg);
        cache.set(cacheKey, computedValue);
    }
    return computedValue;
}
function variadic(fn, cache, serializer) {
    var args = Array.prototype.slice.call(arguments, 3);
    var cacheKey = serializer(args);
    var computedValue = cache.get(cacheKey);
    if (typeof computedValue === 'undefined') {
        computedValue = fn.apply(this, args);
        cache.set(cacheKey, computedValue);
    }
    return computedValue;
}
function assemble(fn, context, strategy, cache, serialize) {
    return strategy.bind(context, fn, cache, serialize);
}
function strategyDefault(fn, options) {
    var strategy = fn.length === 1 ? monadic : variadic;
    return assemble(fn, this, strategy, options.cache.create(), options.serializer);
}
function strategyVariadic(fn, options) {
    return assemble(fn, this, variadic, options.cache.create(), options.serializer);
}
function strategyMonadic(fn, options) {
    return assemble(fn, this, monadic, options.cache.create(), options.serializer);
}
//
// Serializer
//
var serializerDefault = function () {
    return JSON.stringify(arguments);
};
//
// Cache
//
function ObjectWithoutPrototypeCache() {
    this.cache = Object.create(null);
}
ObjectWithoutPrototypeCache.prototype.get = function (key) {
    return this.cache[key];
};
ObjectWithoutPrototypeCache.prototype.set = function (key, value) {
    this.cache[key] = value;
};
var cacheDefault = {
    create: function create() {
        // @ts-ignore
        return new ObjectWithoutPrototypeCache();
    },
};
var strategies = {
    variadic: strategyVariadic,
    monadic: strategyMonadic,
};

var ErrorKind;
(function (ErrorKind) {
    /** Argument is unclosed (e.g. `{0`) */
    ErrorKind[ErrorKind["EXPECT_ARGUMENT_CLOSING_BRACE"] = 1] = "EXPECT_ARGUMENT_CLOSING_BRACE";
    /** Argument is empty (e.g. `{}`). */
    ErrorKind[ErrorKind["EMPTY_ARGUMENT"] = 2] = "EMPTY_ARGUMENT";
    /** Argument is malformed (e.g. `{foo!}``) */
    ErrorKind[ErrorKind["MALFORMED_ARGUMENT"] = 3] = "MALFORMED_ARGUMENT";
    /** Expect an argument type (e.g. `{foo,}`) */
    ErrorKind[ErrorKind["EXPECT_ARGUMENT_TYPE"] = 4] = "EXPECT_ARGUMENT_TYPE";
    /** Unsupported argument type (e.g. `{foo,foo}`) */
    ErrorKind[ErrorKind["INVALID_ARGUMENT_TYPE"] = 5] = "INVALID_ARGUMENT_TYPE";
    /** Expect an argument style (e.g. `{foo, number, }`) */
    ErrorKind[ErrorKind["EXPECT_ARGUMENT_STYLE"] = 6] = "EXPECT_ARGUMENT_STYLE";
    /** The number skeleton is invalid. */
    ErrorKind[ErrorKind["INVALID_NUMBER_SKELETON"] = 7] = "INVALID_NUMBER_SKELETON";
    /** The date time skeleton is invalid. */
    ErrorKind[ErrorKind["INVALID_DATE_TIME_SKELETON"] = 8] = "INVALID_DATE_TIME_SKELETON";
    /** Exepct a number skeleton following the `::` (e.g. `{foo, number, ::}`) */
    ErrorKind[ErrorKind["EXPECT_NUMBER_SKELETON"] = 9] = "EXPECT_NUMBER_SKELETON";
    /** Exepct a date time skeleton following the `::` (e.g. `{foo, date, ::}`) */
    ErrorKind[ErrorKind["EXPECT_DATE_TIME_SKELETON"] = 10] = "EXPECT_DATE_TIME_SKELETON";
    /** Unmatched apostrophes in the argument style (e.g. `{foo, number, 'test`) */
    ErrorKind[ErrorKind["UNCLOSED_QUOTE_IN_ARGUMENT_STYLE"] = 11] = "UNCLOSED_QUOTE_IN_ARGUMENT_STYLE";
    /** Missing select argument options (e.g. `{foo, select}`) */
    ErrorKind[ErrorKind["EXPECT_SELECT_ARGUMENT_OPTIONS"] = 12] = "EXPECT_SELECT_ARGUMENT_OPTIONS";
    /** Expecting an offset value in `plural` or `selectordinal` argument (e.g `{foo, plural, offset}`) */
    ErrorKind[ErrorKind["EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE"] = 13] = "EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE";
    /** Offset value in `plural` or `selectordinal` is invalid (e.g. `{foo, plural, offset: x}`) */
    ErrorKind[ErrorKind["INVALID_PLURAL_ARGUMENT_OFFSET_VALUE"] = 14] = "INVALID_PLURAL_ARGUMENT_OFFSET_VALUE";
    /** Expecting a selector in `select` argument (e.g `{foo, select}`) */
    ErrorKind[ErrorKind["EXPECT_SELECT_ARGUMENT_SELECTOR"] = 15] = "EXPECT_SELECT_ARGUMENT_SELECTOR";
    /** Expecting a selector in `plural` or `selectordinal` argument (e.g `{foo, plural}`) */
    ErrorKind[ErrorKind["EXPECT_PLURAL_ARGUMENT_SELECTOR"] = 16] = "EXPECT_PLURAL_ARGUMENT_SELECTOR";
    /** Expecting a message fragment after the `select` selector (e.g. `{foo, select, apple}`) */
    ErrorKind[ErrorKind["EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT"] = 17] = "EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT";
    /**
     * Expecting a message fragment after the `plural` or `selectordinal` selector
     * (e.g. `{foo, plural, one}`)
     */
    ErrorKind[ErrorKind["EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT"] = 18] = "EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT";
    /** Selector in `plural` or `selectordinal` is malformed (e.g. `{foo, plural, =x {#}}`) */
    ErrorKind[ErrorKind["INVALID_PLURAL_ARGUMENT_SELECTOR"] = 19] = "INVALID_PLURAL_ARGUMENT_SELECTOR";
    /**
     * Duplicate selectors in `plural` or `selectordinal` argument.
     * (e.g. {foo, plural, one {#} one {#}})
     */
    ErrorKind[ErrorKind["DUPLICATE_PLURAL_ARGUMENT_SELECTOR"] = 20] = "DUPLICATE_PLURAL_ARGUMENT_SELECTOR";
    /** Duplicate selectors in `select` argument.
     * (e.g. {foo, select, apple {apple} apple {apple}})
     */
    ErrorKind[ErrorKind["DUPLICATE_SELECT_ARGUMENT_SELECTOR"] = 21] = "DUPLICATE_SELECT_ARGUMENT_SELECTOR";
    /** Plural or select argument option must have `other` clause. */
    ErrorKind[ErrorKind["MISSING_OTHER_CLAUSE"] = 22] = "MISSING_OTHER_CLAUSE";
    /** The tag is malformed. (e.g. `<bold!>foo</bold!>) */
    ErrorKind[ErrorKind["INVALID_TAG"] = 23] = "INVALID_TAG";
    /** The tag name is invalid. (e.g. `<123>foo</123>`) */
    ErrorKind[ErrorKind["INVALID_TAG_NAME"] = 25] = "INVALID_TAG_NAME";
    /** The closing tag does not match the opening tag. (e.g. `<bold>foo</italic>`) */
    ErrorKind[ErrorKind["UNMATCHED_CLOSING_TAG"] = 26] = "UNMATCHED_CLOSING_TAG";
    /** The opening tag has unmatched closing tag. (e.g. `<bold>foo`) */
    ErrorKind[ErrorKind["UNCLOSED_TAG"] = 27] = "UNCLOSED_TAG";
})(ErrorKind || (ErrorKind = {}));

var TYPE;
(function (TYPE) {
    /**
     * Raw text
     */
    TYPE[TYPE["literal"] = 0] = "literal";
    /**
     * Variable w/o any format, e.g `var` in `this is a {var}`
     */
    TYPE[TYPE["argument"] = 1] = "argument";
    /**
     * Variable w/ number format
     */
    TYPE[TYPE["number"] = 2] = "number";
    /**
     * Variable w/ date format
     */
    TYPE[TYPE["date"] = 3] = "date";
    /**
     * Variable w/ time format
     */
    TYPE[TYPE["time"] = 4] = "time";
    /**
     * Variable w/ select format
     */
    TYPE[TYPE["select"] = 5] = "select";
    /**
     * Variable w/ plural format
     */
    TYPE[TYPE["plural"] = 6] = "plural";
    /**
     * Only possible within plural argument.
     * This is the `#` symbol that will be substituted with the count.
     */
    TYPE[TYPE["pound"] = 7] = "pound";
    /**
     * XML-like tag
     */
    TYPE[TYPE["tag"] = 8] = "tag";
})(TYPE || (TYPE = {}));
var SKELETON_TYPE;
(function (SKELETON_TYPE) {
    SKELETON_TYPE[SKELETON_TYPE["number"] = 0] = "number";
    SKELETON_TYPE[SKELETON_TYPE["dateTime"] = 1] = "dateTime";
})(SKELETON_TYPE || (SKELETON_TYPE = {}));
/**
 * Type Guards
 */
function isLiteralElement(el) {
    return el.type === TYPE.literal;
}
function isArgumentElement(el) {
    return el.type === TYPE.argument;
}
function isNumberElement(el) {
    return el.type === TYPE.number;
}
function isDateElement(el) {
    return el.type === TYPE.date;
}
function isTimeElement(el) {
    return el.type === TYPE.time;
}
function isSelectElement(el) {
    return el.type === TYPE.select;
}
function isPluralElement(el) {
    return el.type === TYPE.plural;
}
function isPoundElement(el) {
    return el.type === TYPE.pound;
}
function isTagElement(el) {
    return el.type === TYPE.tag;
}
function isNumberSkeleton(el) {
    return !!(el && typeof el === 'object' && el.type === SKELETON_TYPE.number);
}
function isDateTimeSkeleton(el) {
    return !!(el && typeof el === 'object' && el.type === SKELETON_TYPE.dateTime);
}

// @generated from regex-gen.ts
var SPACE_SEPARATOR_REGEX = /[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/;

/**
 * https://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * Credit: https://github.com/caridy/intl-datetimeformat-pattern/blob/master/index.js
 * with some tweaks
 */
var DATE_TIME_REGEX = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
/**
 * Parse Date time skeleton into Intl.DateTimeFormatOptions
 * Ref: https://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * @public
 * @param skeleton skeleton string
 */
function parseDateTimeSkeleton(skeleton) {
    var result = {};
    skeleton.replace(DATE_TIME_REGEX, function (match) {
        var len = match.length;
        switch (match[0]) {
            // Era
            case 'G':
                result.era = len === 4 ? 'long' : len === 5 ? 'narrow' : 'short';
                break;
            // Year
            case 'y':
                result.year = len === 2 ? '2-digit' : 'numeric';
                break;
            case 'Y':
            case 'u':
            case 'U':
            case 'r':
                throw new RangeError('`Y/u/U/r` (year) patterns are not supported, use `y` instead');
            // Quarter
            case 'q':
            case 'Q':
                throw new RangeError('`q/Q` (quarter) patterns are not supported');
            // Month
            case 'M':
            case 'L':
                result.month = ['numeric', '2-digit', 'short', 'long', 'narrow'][len - 1];
                break;
            // Week
            case 'w':
            case 'W':
                throw new RangeError('`w/W` (week) patterns are not supported');
            case 'd':
                result.day = ['numeric', '2-digit'][len - 1];
                break;
            case 'D':
            case 'F':
            case 'g':
                throw new RangeError('`D/F/g` (day) patterns are not supported, use `d` instead');
            // Weekday
            case 'E':
                result.weekday = len === 4 ? 'long' : len === 5 ? 'narrow' : 'short';
                break;
            case 'e':
                if (len < 4) {
                    throw new RangeError('`e..eee` (weekday) patterns are not supported');
                }
                result.weekday = ['short', 'long', 'narrow', 'short'][len - 4];
                break;
            case 'c':
                if (len < 4) {
                    throw new RangeError('`c..ccc` (weekday) patterns are not supported');
                }
                result.weekday = ['short', 'long', 'narrow', 'short'][len - 4];
                break;
            // Period
            case 'a': // AM, PM
                result.hour12 = true;
                break;
            case 'b': // am, pm, noon, midnight
            case 'B': // flexible day periods
                throw new RangeError('`b/B` (period) patterns are not supported, use `a` instead');
            // Hour
            case 'h':
                result.hourCycle = 'h12';
                result.hour = ['numeric', '2-digit'][len - 1];
                break;
            case 'H':
                result.hourCycle = 'h23';
                result.hour = ['numeric', '2-digit'][len - 1];
                break;
            case 'K':
                result.hourCycle = 'h11';
                result.hour = ['numeric', '2-digit'][len - 1];
                break;
            case 'k':
                result.hourCycle = 'h24';
                result.hour = ['numeric', '2-digit'][len - 1];
                break;
            case 'j':
            case 'J':
            case 'C':
                throw new RangeError('`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead');
            // Minute
            case 'm':
                result.minute = ['numeric', '2-digit'][len - 1];
                break;
            // Second
            case 's':
                result.second = ['numeric', '2-digit'][len - 1];
                break;
            case 'S':
            case 'A':
                throw new RangeError('`S/A` (second) patterns are not supported, use `s` instead');
            // Zone
            case 'z': // 1..3, 4: specific non-location format
                result.timeZoneName = len < 4 ? 'short' : 'long';
                break;
            case 'Z': // 1..3, 4, 5: The ISO8601 varios formats
            case 'O': // 1, 4: milliseconds in day short, long
            case 'v': // 1, 4: generic non-location format
            case 'V': // 1, 2, 3, 4: time zone ID or city
            case 'X': // 1, 2, 3, 4: The ISO8601 varios formats
            case 'x': // 1, 2, 3, 4: The ISO8601 varios formats
                throw new RangeError('`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead');
        }
        return '';
    });
    return result;
}

// @generated from regex-gen.ts
var WHITE_SPACE_REGEX = /[\t-\r \x85\u200E\u200F\u2028\u2029]/i;

function parseNumberSkeletonFromString(skeleton) {
    if (skeleton.length === 0) {
        throw new Error('Number skeleton cannot be empty');
    }
    // Parse the skeleton
    var stringTokens = skeleton
        .split(WHITE_SPACE_REGEX)
        .filter(function (x) { return x.length > 0; });
    var tokens = [];
    for (var _i = 0, stringTokens_1 = stringTokens; _i < stringTokens_1.length; _i++) {
        var stringToken = stringTokens_1[_i];
        var stemAndOptions = stringToken.split('/');
        if (stemAndOptions.length === 0) {
            throw new Error('Invalid number skeleton');
        }
        var stem = stemAndOptions[0], options = stemAndOptions.slice(1);
        for (var _a = 0, options_1 = options; _a < options_1.length; _a++) {
            var option = options_1[_a];
            if (option.length === 0) {
                throw new Error('Invalid number skeleton');
            }
        }
        tokens.push({ stem: stem, options: options });
    }
    return tokens;
}
function icuUnitToEcma(unit) {
    return unit.replace(/^(.*?)-/, '');
}
var FRACTION_PRECISION_REGEX = /^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g;
var SIGNIFICANT_PRECISION_REGEX = /^(@+)?(\+|#+)?[rs]?$/g;
var INTEGER_WIDTH_REGEX = /(\*)(0+)|(#+)(0+)|(0+)/g;
var CONCISE_INTEGER_WIDTH_REGEX = /^(0+)$/;
function parseSignificantPrecision(str) {
    var result = {};
    if (str[str.length - 1] === 'r') {
        result.roundingPriority = 'morePrecision';
    }
    else if (str[str.length - 1] === 's') {
        result.roundingPriority = 'lessPrecision';
    }
    str.replace(SIGNIFICANT_PRECISION_REGEX, function (_, g1, g2) {
        // @@@ case
        if (typeof g2 !== 'string') {
            result.minimumSignificantDigits = g1.length;
            result.maximumSignificantDigits = g1.length;
        }
        // @@@+ case
        else if (g2 === '+') {
            result.minimumSignificantDigits = g1.length;
        }
        // .### case
        else if (g1[0] === '#') {
            result.maximumSignificantDigits = g1.length;
        }
        // .@@## or .@@@ case
        else {
            result.minimumSignificantDigits = g1.length;
            result.maximumSignificantDigits =
                g1.length + (typeof g2 === 'string' ? g2.length : 0);
        }
        return '';
    });
    return result;
}
function parseSign(str) {
    switch (str) {
        case 'sign-auto':
            return {
                signDisplay: 'auto',
            };
        case 'sign-accounting':
        case '()':
            return {
                currencySign: 'accounting',
            };
        case 'sign-always':
        case '+!':
            return {
                signDisplay: 'always',
            };
        case 'sign-accounting-always':
        case '()!':
            return {
                signDisplay: 'always',
                currencySign: 'accounting',
            };
        case 'sign-except-zero':
        case '+?':
            return {
                signDisplay: 'exceptZero',
            };
        case 'sign-accounting-except-zero':
        case '()?':
            return {
                signDisplay: 'exceptZero',
                currencySign: 'accounting',
            };
        case 'sign-never':
        case '+_':
            return {
                signDisplay: 'never',
            };
    }
}
function parseConciseScientificAndEngineeringStem(stem) {
    // Engineering
    var result;
    if (stem[0] === 'E' && stem[1] === 'E') {
        result = {
            notation: 'engineering',
        };
        stem = stem.slice(2);
    }
    else if (stem[0] === 'E') {
        result = {
            notation: 'scientific',
        };
        stem = stem.slice(1);
    }
    if (result) {
        var signDisplay = stem.slice(0, 2);
        if (signDisplay === '+!') {
            result.signDisplay = 'always';
            stem = stem.slice(2);
        }
        else if (signDisplay === '+?') {
            result.signDisplay = 'exceptZero';
            stem = stem.slice(2);
        }
        if (!CONCISE_INTEGER_WIDTH_REGEX.test(stem)) {
            throw new Error('Malformed concise eng/scientific notation');
        }
        result.minimumIntegerDigits = stem.length;
    }
    return result;
}
function parseNotationOptions(opt) {
    var result = {};
    var signOpts = parseSign(opt);
    if (signOpts) {
        return signOpts;
    }
    return result;
}
/**
 * https://github.com/unicode-org/icu/blob/master/docs/userguide/format_parse/numbers/skeletons.md#skeleton-stems-and-options
 */
function parseNumberSkeleton(tokens) {
    var result = {};
    for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
        var token = tokens_1[_i];
        switch (token.stem) {
            case 'percent':
            case '%':
                result.style = 'percent';
                continue;
            case '%x100':
                result.style = 'percent';
                result.scale = 100;
                continue;
            case 'currency':
                result.style = 'currency';
                result.currency = token.options[0];
                continue;
            case 'group-off':
            case ',_':
                result.useGrouping = false;
                continue;
            case 'precision-integer':
            case '.':
                result.maximumFractionDigits = 0;
                continue;
            case 'measure-unit':
            case 'unit':
                result.style = 'unit';
                result.unit = icuUnitToEcma(token.options[0]);
                continue;
            case 'compact-short':
            case 'K':
                result.notation = 'compact';
                result.compactDisplay = 'short';
                continue;
            case 'compact-long':
            case 'KK':
                result.notation = 'compact';
                result.compactDisplay = 'long';
                continue;
            case 'scientific':
                result = __assign(__assign(__assign({}, result), { notation: 'scientific' }), token.options.reduce(function (all, opt) { return (__assign(__assign({}, all), parseNotationOptions(opt))); }, {}));
                continue;
            case 'engineering':
                result = __assign(__assign(__assign({}, result), { notation: 'engineering' }), token.options.reduce(function (all, opt) { return (__assign(__assign({}, all), parseNotationOptions(opt))); }, {}));
                continue;
            case 'notation-simple':
                result.notation = 'standard';
                continue;
            // https://github.com/unicode-org/icu/blob/master/icu4c/source/i18n/unicode/unumberformatter.h
            case 'unit-width-narrow':
                result.currencyDisplay = 'narrowSymbol';
                result.unitDisplay = 'narrow';
                continue;
            case 'unit-width-short':
                result.currencyDisplay = 'code';
                result.unitDisplay = 'short';
                continue;
            case 'unit-width-full-name':
                result.currencyDisplay = 'name';
                result.unitDisplay = 'long';
                continue;
            case 'unit-width-iso-code':
                result.currencyDisplay = 'symbol';
                continue;
            case 'scale':
                result.scale = parseFloat(token.options[0]);
                continue;
            case 'rounding-mode-floor':
                result.roundingMode = 'floor';
                continue;
            case 'rounding-mode-ceiling':
                result.roundingMode = 'ceil';
                continue;
            case 'rounding-mode-down':
                result.roundingMode = 'trunc';
                continue;
            case 'rounding-mode-up':
                result.roundingMode = 'expand';
                continue;
            case 'rounding-mode-half-even':
                result.roundingMode = 'halfEven';
                continue;
            case 'rounding-mode-half-down':
                result.roundingMode = 'halfTrunc';
                continue;
            case 'rounding-mode-half-up':
                result.roundingMode = 'halfExpand';
                continue;
            // https://unicode-org.github.io/icu/userguide/format_parse/numbers/skeletons.html#integer-width
            case 'integer-width':
                if (token.options.length > 1) {
                    throw new RangeError('integer-width stems only accept a single optional option');
                }
                token.options[0].replace(INTEGER_WIDTH_REGEX, function (_, g1, g2, g3, g4, g5) {
                    if (g1) {
                        result.minimumIntegerDigits = g2.length;
                    }
                    else if (g3 && g4) {
                        throw new Error('We currently do not support maximum integer digits');
                    }
                    else if (g5) {
                        throw new Error('We currently do not support exact integer digits');
                    }
                    return '';
                });
                continue;
        }
        // https://unicode-org.github.io/icu/userguide/format_parse/numbers/skeletons.html#integer-width
        if (CONCISE_INTEGER_WIDTH_REGEX.test(token.stem)) {
            result.minimumIntegerDigits = token.stem.length;
            continue;
        }
        if (FRACTION_PRECISION_REGEX.test(token.stem)) {
            // Precision
            // https://unicode-org.github.io/icu/userguide/format_parse/numbers/skeletons.html#fraction-precision
            // precision-integer case
            if (token.options.length > 1) {
                throw new RangeError('Fraction-precision stems only accept a single optional option');
            }
            token.stem.replace(FRACTION_PRECISION_REGEX, function (_, g1, g2, g3, g4, g5) {
                // .000* case (before ICU67 it was .000+)
                if (g2 === '*') {
                    result.minimumFractionDigits = g1.length;
                }
                // .### case
                else if (g3 && g3[0] === '#') {
                    result.maximumFractionDigits = g3.length;
                }
                // .00## case
                else if (g4 && g5) {
                    result.minimumFractionDigits = g4.length;
                    result.maximumFractionDigits = g4.length + g5.length;
                }
                else {
                    result.minimumFractionDigits = g1.length;
                    result.maximumFractionDigits = g1.length;
                }
                return '';
            });
            var opt = token.options[0];
            // https://unicode-org.github.io/icu/userguide/format_parse/numbers/skeletons.html#trailing-zero-display
            if (opt === 'w') {
                result = __assign(__assign({}, result), { trailingZeroDisplay: 'stripIfInteger' });
            }
            else if (opt) {
                result = __assign(__assign({}, result), parseSignificantPrecision(opt));
            }
            continue;
        }
        // https://unicode-org.github.io/icu/userguide/format_parse/numbers/skeletons.html#significant-digits-precision
        if (SIGNIFICANT_PRECISION_REGEX.test(token.stem)) {
            result = __assign(__assign({}, result), parseSignificantPrecision(token.stem));
            continue;
        }
        var signOpts = parseSign(token.stem);
        if (signOpts) {
            result = __assign(__assign({}, result), signOpts);
        }
        var conciseScientificAndEngineeringOpts = parseConciseScientificAndEngineeringStem(token.stem);
        if (conciseScientificAndEngineeringOpts) {
            result = __assign(__assign({}, result), conciseScientificAndEngineeringOpts);
        }
    }
    return result;
}

// @generated from time-data-gen.ts
// prettier-ignore  
var timeData = {
    "001": [
        "H",
        "h"
    ],
    "419": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "AC": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "AD": [
        "H",
        "hB"
    ],
    "AE": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "AF": [
        "H",
        "hb",
        "hB",
        "h"
    ],
    "AG": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "AI": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "AL": [
        "h",
        "H",
        "hB"
    ],
    "AM": [
        "H",
        "hB"
    ],
    "AO": [
        "H",
        "hB"
    ],
    "AR": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "AS": [
        "h",
        "H"
    ],
    "AT": [
        "H",
        "hB"
    ],
    "AU": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "AW": [
        "H",
        "hB"
    ],
    "AX": [
        "H"
    ],
    "AZ": [
        "H",
        "hB",
        "h"
    ],
    "BA": [
        "H",
        "hB",
        "h"
    ],
    "BB": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "BD": [
        "h",
        "hB",
        "H"
    ],
    "BE": [
        "H",
        "hB"
    ],
    "BF": [
        "H",
        "hB"
    ],
    "BG": [
        "H",
        "hB",
        "h"
    ],
    "BH": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "BI": [
        "H",
        "h"
    ],
    "BJ": [
        "H",
        "hB"
    ],
    "BL": [
        "H",
        "hB"
    ],
    "BM": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "BN": [
        "hb",
        "hB",
        "h",
        "H"
    ],
    "BO": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "BQ": [
        "H"
    ],
    "BR": [
        "H",
        "hB"
    ],
    "BS": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "BT": [
        "h",
        "H"
    ],
    "BW": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "BY": [
        "H",
        "h"
    ],
    "BZ": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "CA": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "CC": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "CD": [
        "hB",
        "H"
    ],
    "CF": [
        "H",
        "h",
        "hB"
    ],
    "CG": [
        "H",
        "hB"
    ],
    "CH": [
        "H",
        "hB",
        "h"
    ],
    "CI": [
        "H",
        "hB"
    ],
    "CK": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "CL": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "CM": [
        "H",
        "h",
        "hB"
    ],
    "CN": [
        "H",
        "hB",
        "hb",
        "h"
    ],
    "CO": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "CP": [
        "H"
    ],
    "CR": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "CU": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "CV": [
        "H",
        "hB"
    ],
    "CW": [
        "H",
        "hB"
    ],
    "CX": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "CY": [
        "h",
        "H",
        "hb",
        "hB"
    ],
    "CZ": [
        "H"
    ],
    "DE": [
        "H",
        "hB"
    ],
    "DG": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "DJ": [
        "h",
        "H"
    ],
    "DK": [
        "H"
    ],
    "DM": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "DO": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "DZ": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "EA": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "EC": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "EE": [
        "H",
        "hB"
    ],
    "EG": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "EH": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "ER": [
        "h",
        "H"
    ],
    "ES": [
        "H",
        "hB",
        "h",
        "hb"
    ],
    "ET": [
        "hB",
        "hb",
        "h",
        "H"
    ],
    "FI": [
        "H"
    ],
    "FJ": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "FK": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "FM": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "FO": [
        "H",
        "h"
    ],
    "FR": [
        "H",
        "hB"
    ],
    "GA": [
        "H",
        "hB"
    ],
    "GB": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "GD": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "GE": [
        "H",
        "hB",
        "h"
    ],
    "GF": [
        "H",
        "hB"
    ],
    "GG": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "GH": [
        "h",
        "H"
    ],
    "GI": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "GL": [
        "H",
        "h"
    ],
    "GM": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "GN": [
        "H",
        "hB"
    ],
    "GP": [
        "H",
        "hB"
    ],
    "GQ": [
        "H",
        "hB",
        "h",
        "hb"
    ],
    "GR": [
        "h",
        "H",
        "hb",
        "hB"
    ],
    "GT": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "GU": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "GW": [
        "H",
        "hB"
    ],
    "GY": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "HK": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "HN": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "HR": [
        "H",
        "hB"
    ],
    "HU": [
        "H",
        "h"
    ],
    "IC": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "ID": [
        "H"
    ],
    "IE": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "IL": [
        "H",
        "hB"
    ],
    "IM": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "IN": [
        "h",
        "H"
    ],
    "IO": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "IQ": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "IR": [
        "hB",
        "H"
    ],
    "IS": [
        "H"
    ],
    "IT": [
        "H",
        "hB"
    ],
    "JE": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "JM": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "JO": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "JP": [
        "H",
        "K",
        "h"
    ],
    "KE": [
        "hB",
        "hb",
        "H",
        "h"
    ],
    "KG": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "KH": [
        "hB",
        "h",
        "H",
        "hb"
    ],
    "KI": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "KM": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "KN": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "KP": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "KR": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "KW": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "KY": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "KZ": [
        "H",
        "hB"
    ],
    "LA": [
        "H",
        "hb",
        "hB",
        "h"
    ],
    "LB": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "LC": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "LI": [
        "H",
        "hB",
        "h"
    ],
    "LK": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "LR": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "LS": [
        "h",
        "H"
    ],
    "LT": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "LU": [
        "H",
        "h",
        "hB"
    ],
    "LV": [
        "H",
        "hB",
        "hb",
        "h"
    ],
    "LY": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "MA": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "MC": [
        "H",
        "hB"
    ],
    "MD": [
        "H",
        "hB"
    ],
    "ME": [
        "H",
        "hB",
        "h"
    ],
    "MF": [
        "H",
        "hB"
    ],
    "MG": [
        "H",
        "h"
    ],
    "MH": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "MK": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "ML": [
        "H"
    ],
    "MM": [
        "hB",
        "hb",
        "H",
        "h"
    ],
    "MN": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "MO": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "MP": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "MQ": [
        "H",
        "hB"
    ],
    "MR": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "MS": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "MT": [
        "H",
        "h"
    ],
    "MU": [
        "H",
        "h"
    ],
    "MV": [
        "H",
        "h"
    ],
    "MW": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "MX": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "MY": [
        "hb",
        "hB",
        "h",
        "H"
    ],
    "MZ": [
        "H",
        "hB"
    ],
    "NA": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "NC": [
        "H",
        "hB"
    ],
    "NE": [
        "H"
    ],
    "NF": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "NG": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "NI": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "NL": [
        "H",
        "hB"
    ],
    "NO": [
        "H",
        "h"
    ],
    "NP": [
        "H",
        "h",
        "hB"
    ],
    "NR": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "NU": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "NZ": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "OM": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "PA": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "PE": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "PF": [
        "H",
        "h",
        "hB"
    ],
    "PG": [
        "h",
        "H"
    ],
    "PH": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "PK": [
        "h",
        "hB",
        "H"
    ],
    "PL": [
        "H",
        "h"
    ],
    "PM": [
        "H",
        "hB"
    ],
    "PN": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "PR": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "PS": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "PT": [
        "H",
        "hB"
    ],
    "PW": [
        "h",
        "H"
    ],
    "PY": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "QA": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "RE": [
        "H",
        "hB"
    ],
    "RO": [
        "H",
        "hB"
    ],
    "RS": [
        "H",
        "hB",
        "h"
    ],
    "RU": [
        "H"
    ],
    "RW": [
        "H",
        "h"
    ],
    "SA": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "SB": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "SC": [
        "H",
        "h",
        "hB"
    ],
    "SD": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "SE": [
        "H"
    ],
    "SG": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "SH": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "SI": [
        "H",
        "hB"
    ],
    "SJ": [
        "H"
    ],
    "SK": [
        "H"
    ],
    "SL": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "SM": [
        "H",
        "h",
        "hB"
    ],
    "SN": [
        "H",
        "h",
        "hB"
    ],
    "SO": [
        "h",
        "H"
    ],
    "SR": [
        "H",
        "hB"
    ],
    "SS": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "ST": [
        "H",
        "hB"
    ],
    "SV": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "SX": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "SY": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "SZ": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "TA": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "TC": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "TD": [
        "h",
        "H",
        "hB"
    ],
    "TF": [
        "H",
        "h",
        "hB"
    ],
    "TG": [
        "H",
        "hB"
    ],
    "TH": [
        "H",
        "h"
    ],
    "TJ": [
        "H",
        "h"
    ],
    "TL": [
        "H",
        "hB",
        "hb",
        "h"
    ],
    "TM": [
        "H",
        "h"
    ],
    "TN": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "TO": [
        "h",
        "H"
    ],
    "TR": [
        "H",
        "hB"
    ],
    "TT": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "TW": [
        "hB",
        "hb",
        "h",
        "H"
    ],
    "TZ": [
        "hB",
        "hb",
        "H",
        "h"
    ],
    "UA": [
        "H",
        "hB",
        "h"
    ],
    "UG": [
        "hB",
        "hb",
        "H",
        "h"
    ],
    "UM": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "US": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "UY": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "UZ": [
        "H",
        "hB",
        "h"
    ],
    "VA": [
        "H",
        "h",
        "hB"
    ],
    "VC": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "VE": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "VG": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "VI": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "VN": [
        "H",
        "h"
    ],
    "VU": [
        "h",
        "H"
    ],
    "WF": [
        "H",
        "hB"
    ],
    "WS": [
        "h",
        "H"
    ],
    "XK": [
        "H",
        "hB",
        "h"
    ],
    "YE": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "YT": [
        "H",
        "hB"
    ],
    "ZA": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "ZM": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "ZW": [
        "H",
        "h"
    ],
    "af-ZA": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "ar-001": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "ca-ES": [
        "H",
        "h",
        "hB"
    ],
    "en-001": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "es-BR": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "es-ES": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "es-GQ": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "fr-CA": [
        "H",
        "h",
        "hB"
    ],
    "gl-ES": [
        "H",
        "h",
        "hB"
    ],
    "gu-IN": [
        "hB",
        "hb",
        "h",
        "H"
    ],
    "hi-IN": [
        "hB",
        "h",
        "H"
    ],
    "it-CH": [
        "H",
        "h",
        "hB"
    ],
    "it-IT": [
        "H",
        "h",
        "hB"
    ],
    "kn-IN": [
        "hB",
        "h",
        "H"
    ],
    "ml-IN": [
        "hB",
        "h",
        "H"
    ],
    "mr-IN": [
        "hB",
        "hb",
        "h",
        "H"
    ],
    "pa-IN": [
        "hB",
        "hb",
        "h",
        "H"
    ],
    "ta-IN": [
        "hB",
        "h",
        "hb",
        "H"
    ],
    "te-IN": [
        "hB",
        "h",
        "H"
    ],
    "zu-ZA": [
        "H",
        "hB",
        "hb",
        "h"
    ]
};

/**
 * Returns the best matching date time pattern if a date time skeleton
 * pattern is provided with a locale. Follows the Unicode specification:
 * https://www.unicode.org/reports/tr35/tr35-dates.html#table-mapping-requested-time-skeletons-to-patterns
 * @param skeleton date time skeleton pattern that possibly includes j, J or C
 * @param locale
 */
function getBestPattern(skeleton, locale) {
    var skeletonCopy = '';
    for (var patternPos = 0; patternPos < skeleton.length; patternPos++) {
        var patternChar = skeleton.charAt(patternPos);
        if (patternChar === 'j') {
            var extraLength = 0;
            while (patternPos + 1 < skeleton.length &&
                skeleton.charAt(patternPos + 1) === patternChar) {
                extraLength++;
                patternPos++;
            }
            var hourLen = 1 + (extraLength & 1);
            var dayPeriodLen = extraLength < 2 ? 1 : 3 + (extraLength >> 1);
            var dayPeriodChar = 'a';
            var hourChar = getDefaultHourSymbolFromLocale(locale);
            if (hourChar == 'H' || hourChar == 'k') {
                dayPeriodLen = 0;
            }
            while (dayPeriodLen-- > 0) {
                skeletonCopy += dayPeriodChar;
            }
            while (hourLen-- > 0) {
                skeletonCopy = hourChar + skeletonCopy;
            }
        }
        else if (patternChar === 'J') {
            skeletonCopy += 'H';
        }
        else {
            skeletonCopy += patternChar;
        }
    }
    return skeletonCopy;
}
/**
 * Maps the [hour cycle type](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/hourCycle)
 * of the given `locale` to the corresponding time pattern.
 * @param locale
 */
function getDefaultHourSymbolFromLocale(locale) {
    var hourCycle = locale.hourCycle;
    if (hourCycle === undefined &&
        // @ts-ignore hourCycle(s) is not identified yet
        locale.hourCycles &&
        // @ts-ignore
        locale.hourCycles.length) {
        // @ts-ignore
        hourCycle = locale.hourCycles[0];
    }
    if (hourCycle) {
        switch (hourCycle) {
            case 'h24':
                return 'k';
            case 'h23':
                return 'H';
            case 'h12':
                return 'h';
            case 'h11':
                return 'K';
            default:
                throw new Error('Invalid hourCycle');
        }
    }
    // TODO: Once hourCycle is fully supported remove the following with data generation
    var languageTag = locale.language;
    var regionTag;
    if (languageTag !== 'root') {
        regionTag = locale.maximize().region;
    }
    var hourCycles = timeData[regionTag || ''] ||
        timeData[languageTag || ''] ||
        timeData["".concat(languageTag, "-001")] ||
        timeData['001'];
    return hourCycles[0];
}

var _a;
var SPACE_SEPARATOR_START_REGEX = new RegExp("^".concat(SPACE_SEPARATOR_REGEX.source, "*"));
var SPACE_SEPARATOR_END_REGEX = new RegExp("".concat(SPACE_SEPARATOR_REGEX.source, "*$"));
function createLocation(start, end) {
    return { start: start, end: end };
}
// #region Ponyfills
// Consolidate these variables up top for easier toggling during debugging
var hasNativeStartsWith = !!String.prototype.startsWith && '_a'.startsWith('a', 1);
var hasNativeFromCodePoint = !!String.fromCodePoint;
var hasNativeFromEntries = !!Object.fromEntries;
var hasNativeCodePointAt = !!String.prototype.codePointAt;
var hasTrimStart = !!String.prototype.trimStart;
var hasTrimEnd = !!String.prototype.trimEnd;
var hasNativeIsSafeInteger = !!Number.isSafeInteger;
var isSafeInteger = hasNativeIsSafeInteger
    ? Number.isSafeInteger
    : function (n) {
        return (typeof n === 'number' &&
            isFinite(n) &&
            Math.floor(n) === n &&
            Math.abs(n) <= 0x1fffffffffffff);
    };
// IE11 does not support y and u.
var REGEX_SUPPORTS_U_AND_Y = true;
try {
    var re = RE('([^\\p{White_Space}\\p{Pattern_Syntax}]*)', 'yu');
    /**
     * legacy Edge or Xbox One browser
     * Unicode flag support: supported
     * Pattern_Syntax support: not supported
     * See https://github.com/formatjs/formatjs/issues/2822
     */
    REGEX_SUPPORTS_U_AND_Y = ((_a = re.exec('a')) === null || _a === void 0 ? void 0 : _a[0]) === 'a';
}
catch (_) {
    REGEX_SUPPORTS_U_AND_Y = false;
}
var startsWith = hasNativeStartsWith
    ? // Native
        function startsWith(s, search, position) {
            return s.startsWith(search, position);
        }
    : // For IE11
        function startsWith(s, search, position) {
            return s.slice(position, position + search.length) === search;
        };
var fromCodePoint = hasNativeFromCodePoint
    ? String.fromCodePoint
    : // IE11
        function fromCodePoint() {
            var codePoints = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                codePoints[_i] = arguments[_i];
            }
            var elements = '';
            var length = codePoints.length;
            var i = 0;
            var code;
            while (length > i) {
                code = codePoints[i++];
                if (code > 0x10ffff)
                    throw RangeError(code + ' is not a valid code point');
                elements +=
                    code < 0x10000
                        ? String.fromCharCode(code)
                        : String.fromCharCode(((code -= 0x10000) >> 10) + 0xd800, (code % 0x400) + 0xdc00);
            }
            return elements;
        };
var fromEntries = 
// native
hasNativeFromEntries
    ? Object.fromEntries
    : // Ponyfill
        function fromEntries(entries) {
            var obj = {};
            for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                var _a = entries_1[_i], k = _a[0], v = _a[1];
                obj[k] = v;
            }
            return obj;
        };
var codePointAt = hasNativeCodePointAt
    ? // Native
        function codePointAt(s, index) {
            return s.codePointAt(index);
        }
    : // IE 11
        function codePointAt(s, index) {
            var size = s.length;
            if (index < 0 || index >= size) {
                return undefined;
            }
            var first = s.charCodeAt(index);
            var second;
            return first < 0xd800 ||
                first > 0xdbff ||
                index + 1 === size ||
                (second = s.charCodeAt(index + 1)) < 0xdc00 ||
                second > 0xdfff
                ? first
                : ((first - 0xd800) << 10) + (second - 0xdc00) + 0x10000;
        };
var trimStart = hasTrimStart
    ? // Native
        function trimStart(s) {
            return s.trimStart();
        }
    : // Ponyfill
        function trimStart(s) {
            return s.replace(SPACE_SEPARATOR_START_REGEX, '');
        };
var trimEnd = hasTrimEnd
    ? // Native
        function trimEnd(s) {
            return s.trimEnd();
        }
    : // Ponyfill
        function trimEnd(s) {
            return s.replace(SPACE_SEPARATOR_END_REGEX, '');
        };
// Prevent minifier to translate new RegExp to literal form that might cause syntax error on IE11.
function RE(s, flag) {
    return new RegExp(s, flag);
}
// #endregion
var matchIdentifierAtIndex;
if (REGEX_SUPPORTS_U_AND_Y) {
    // Native
    var IDENTIFIER_PREFIX_RE_1 = RE('([^\\p{White_Space}\\p{Pattern_Syntax}]*)', 'yu');
    matchIdentifierAtIndex = function matchIdentifierAtIndex(s, index) {
        var _a;
        IDENTIFIER_PREFIX_RE_1.lastIndex = index;
        var match = IDENTIFIER_PREFIX_RE_1.exec(s);
        return (_a = match[1]) !== null && _a !== void 0 ? _a : '';
    };
}
else {
    // IE11
    matchIdentifierAtIndex = function matchIdentifierAtIndex(s, index) {
        var match = [];
        while (true) {
            var c = codePointAt(s, index);
            if (c === undefined || _isWhiteSpace(c) || _isPatternSyntax(c)) {
                break;
            }
            match.push(c);
            index += c >= 0x10000 ? 2 : 1;
        }
        return fromCodePoint.apply(void 0, match);
    };
}
var Parser = /** @class */ (function () {
    function Parser(message, options) {
        if (options === void 0) { options = {}; }
        this.message = message;
        this.position = { offset: 0, line: 1, column: 1 };
        this.ignoreTag = !!options.ignoreTag;
        this.locale = options.locale;
        this.requiresOtherClause = !!options.requiresOtherClause;
        this.shouldParseSkeletons = !!options.shouldParseSkeletons;
    }
    Parser.prototype.parse = function () {
        if (this.offset() !== 0) {
            throw Error('parser can only be used once');
        }
        return this.parseMessage(0, '', false);
    };
    Parser.prototype.parseMessage = function (nestingLevel, parentArgType, expectingCloseTag) {
        var elements = [];
        while (!this.isEOF()) {
            var char = this.char();
            if (char === 123 /* `{` */) {
                var result = this.parseArgument(nestingLevel, expectingCloseTag);
                if (result.err) {
                    return result;
                }
                elements.push(result.val);
            }
            else if (char === 125 /* `}` */ && nestingLevel > 0) {
                break;
            }
            else if (char === 35 /* `#` */ &&
                (parentArgType === 'plural' || parentArgType === 'selectordinal')) {
                var position = this.clonePosition();
                this.bump();
                elements.push({
                    type: TYPE.pound,
                    location: createLocation(position, this.clonePosition()),
                });
            }
            else if (char === 60 /* `<` */ &&
                !this.ignoreTag &&
                this.peek() === 47 // char code for '/'
            ) {
                if (expectingCloseTag) {
                    break;
                }
                else {
                    return this.error(ErrorKind.UNMATCHED_CLOSING_TAG, createLocation(this.clonePosition(), this.clonePosition()));
                }
            }
            else if (char === 60 /* `<` */ &&
                !this.ignoreTag &&
                _isAlpha(this.peek() || 0)) {
                var result = this.parseTag(nestingLevel, parentArgType);
                if (result.err) {
                    return result;
                }
                elements.push(result.val);
            }
            else {
                var result = this.parseLiteral(nestingLevel, parentArgType);
                if (result.err) {
                    return result;
                }
                elements.push(result.val);
            }
        }
        return { val: elements, err: null };
    };
    /**
     * A tag name must start with an ASCII lower/upper case letter. The grammar is based on the
     * [custom element name][] except that a dash is NOT always mandatory and uppercase letters
     * are accepted:
     *
     * ```
     * tag ::= "<" tagName (whitespace)* "/>" | "<" tagName (whitespace)* ">" message "</" tagName (whitespace)* ">"
     * tagName ::= [a-z] (PENChar)*
     * PENChar ::=
     *     "-" | "." | [0-9] | "_" | [a-z] | [A-Z] | #xB7 | [#xC0-#xD6] | [#xD8-#xF6] | [#xF8-#x37D] |
     *     [#x37F-#x1FFF] | [#x200C-#x200D] | [#x203F-#x2040] | [#x2070-#x218F] | [#x2C00-#x2FEF] |
     *     [#x3001-#xD7FF] | [#xF900-#xFDCF] | [#xFDF0-#xFFFD] | [#x10000-#xEFFFF]
     * ```
     *
     * [custom element name]: https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name
     * NOTE: We're a bit more lax here since HTML technically does not allow uppercase HTML element but we do
     * since other tag-based engines like React allow it
     */
    Parser.prototype.parseTag = function (nestingLevel, parentArgType) {
        var startPosition = this.clonePosition();
        this.bump(); // `<`
        var tagName = this.parseTagName();
        this.bumpSpace();
        if (this.bumpIf('/>')) {
            // Self closing tag
            return {
                val: {
                    type: TYPE.literal,
                    value: "<".concat(tagName, "/>"),
                    location: createLocation(startPosition, this.clonePosition()),
                },
                err: null,
            };
        }
        else if (this.bumpIf('>')) {
            var childrenResult = this.parseMessage(nestingLevel + 1, parentArgType, true);
            if (childrenResult.err) {
                return childrenResult;
            }
            var children = childrenResult.val;
            // Expecting a close tag
            var endTagStartPosition = this.clonePosition();
            if (this.bumpIf('</')) {
                if (this.isEOF() || !_isAlpha(this.char())) {
                    return this.error(ErrorKind.INVALID_TAG, createLocation(endTagStartPosition, this.clonePosition()));
                }
                var closingTagNameStartPosition = this.clonePosition();
                var closingTagName = this.parseTagName();
                if (tagName !== closingTagName) {
                    return this.error(ErrorKind.UNMATCHED_CLOSING_TAG, createLocation(closingTagNameStartPosition, this.clonePosition()));
                }
                this.bumpSpace();
                if (!this.bumpIf('>')) {
                    return this.error(ErrorKind.INVALID_TAG, createLocation(endTagStartPosition, this.clonePosition()));
                }
                return {
                    val: {
                        type: TYPE.tag,
                        value: tagName,
                        children: children,
                        location: createLocation(startPosition, this.clonePosition()),
                    },
                    err: null,
                };
            }
            else {
                return this.error(ErrorKind.UNCLOSED_TAG, createLocation(startPosition, this.clonePosition()));
            }
        }
        else {
            return this.error(ErrorKind.INVALID_TAG, createLocation(startPosition, this.clonePosition()));
        }
    };
    /**
     * This method assumes that the caller has peeked ahead for the first tag character.
     */
    Parser.prototype.parseTagName = function () {
        var startOffset = this.offset();
        this.bump(); // the first tag name character
        while (!this.isEOF() && _isPotentialElementNameChar(this.char())) {
            this.bump();
        }
        return this.message.slice(startOffset, this.offset());
    };
    Parser.prototype.parseLiteral = function (nestingLevel, parentArgType) {
        var start = this.clonePosition();
        var value = '';
        while (true) {
            var parseQuoteResult = this.tryParseQuote(parentArgType);
            if (parseQuoteResult) {
                value += parseQuoteResult;
                continue;
            }
            var parseUnquotedResult = this.tryParseUnquoted(nestingLevel, parentArgType);
            if (parseUnquotedResult) {
                value += parseUnquotedResult;
                continue;
            }
            var parseLeftAngleResult = this.tryParseLeftAngleBracket();
            if (parseLeftAngleResult) {
                value += parseLeftAngleResult;
                continue;
            }
            break;
        }
        var location = createLocation(start, this.clonePosition());
        return {
            val: { type: TYPE.literal, value: value, location: location },
            err: null,
        };
    };
    Parser.prototype.tryParseLeftAngleBracket = function () {
        if (!this.isEOF() &&
            this.char() === 60 /* `<` */ &&
            (this.ignoreTag ||
                // If at the opening tag or closing tag position, bail.
                !_isAlphaOrSlash(this.peek() || 0))) {
            this.bump(); // `<`
            return '<';
        }
        return null;
    };
    /**
     * Starting with ICU 4.8, an ASCII apostrophe only starts quoted text if it immediately precedes
     * a character that requires quoting (that is, "only where needed"), and works the same in
     * nested messages as on the top level of the pattern. The new behavior is otherwise compatible.
     */
    Parser.prototype.tryParseQuote = function (parentArgType) {
        if (this.isEOF() || this.char() !== 39 /* `'` */) {
            return null;
        }
        // Parse escaped char following the apostrophe, or early return if there is no escaped char.
        // Check if is valid escaped character
        switch (this.peek()) {
            case 39 /* `'` */:
                // double quote, should return as a single quote.
                this.bump();
                this.bump();
                return "'";
            // '{', '<', '>', '}'
            case 123:
            case 60:
            case 62:
            case 125:
                break;
            case 35: // '#'
                if (parentArgType === 'plural' || parentArgType === 'selectordinal') {
                    break;
                }
                return null;
            default:
                return null;
        }
        this.bump(); // apostrophe
        var codePoints = [this.char()]; // escaped char
        this.bump();
        // read chars until the optional closing apostrophe is found
        while (!this.isEOF()) {
            var ch = this.char();
            if (ch === 39 /* `'` */) {
                if (this.peek() === 39 /* `'` */) {
                    codePoints.push(39);
                    // Bump one more time because we need to skip 2 characters.
                    this.bump();
                }
                else {
                    // Optional closing apostrophe.
                    this.bump();
                    break;
                }
            }
            else {
                codePoints.push(ch);
            }
            this.bump();
        }
        return fromCodePoint.apply(void 0, codePoints);
    };
    Parser.prototype.tryParseUnquoted = function (nestingLevel, parentArgType) {
        if (this.isEOF()) {
            return null;
        }
        var ch = this.char();
        if (ch === 60 /* `<` */ ||
            ch === 123 /* `{` */ ||
            (ch === 35 /* `#` */ &&
                (parentArgType === 'plural' || parentArgType === 'selectordinal')) ||
            (ch === 125 /* `}` */ && nestingLevel > 0)) {
            return null;
        }
        else {
            this.bump();
            return fromCodePoint(ch);
        }
    };
    Parser.prototype.parseArgument = function (nestingLevel, expectingCloseTag) {
        var openingBracePosition = this.clonePosition();
        this.bump(); // `{`
        this.bumpSpace();
        if (this.isEOF()) {
            return this.error(ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
        }
        if (this.char() === 125 /* `}` */) {
            this.bump();
            return this.error(ErrorKind.EMPTY_ARGUMENT, createLocation(openingBracePosition, this.clonePosition()));
        }
        // argument name
        var value = this.parseIdentifierIfPossible().value;
        if (!value) {
            return this.error(ErrorKind.MALFORMED_ARGUMENT, createLocation(openingBracePosition, this.clonePosition()));
        }
        this.bumpSpace();
        if (this.isEOF()) {
            return this.error(ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
        }
        switch (this.char()) {
            // Simple argument: `{name}`
            case 125 /* `}` */: {
                this.bump(); // `}`
                return {
                    val: {
                        type: TYPE.argument,
                        // value does not include the opening and closing braces.
                        value: value,
                        location: createLocation(openingBracePosition, this.clonePosition()),
                    },
                    err: null,
                };
            }
            // Argument with options: `{name, format, ...}`
            case 44 /* `,` */: {
                this.bump(); // `,`
                this.bumpSpace();
                if (this.isEOF()) {
                    return this.error(ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
                }
                return this.parseArgumentOptions(nestingLevel, expectingCloseTag, value, openingBracePosition);
            }
            default:
                return this.error(ErrorKind.MALFORMED_ARGUMENT, createLocation(openingBracePosition, this.clonePosition()));
        }
    };
    /**
     * Advance the parser until the end of the identifier, if it is currently on
     * an identifier character. Return an empty string otherwise.
     */
    Parser.prototype.parseIdentifierIfPossible = function () {
        var startingPosition = this.clonePosition();
        var startOffset = this.offset();
        var value = matchIdentifierAtIndex(this.message, startOffset);
        var endOffset = startOffset + value.length;
        this.bumpTo(endOffset);
        var endPosition = this.clonePosition();
        var location = createLocation(startingPosition, endPosition);
        return { value: value, location: location };
    };
    Parser.prototype.parseArgumentOptions = function (nestingLevel, expectingCloseTag, value, openingBracePosition) {
        var _a;
        // Parse this range:
        // {name, type, style}
        //        ^---^
        var typeStartPosition = this.clonePosition();
        var argType = this.parseIdentifierIfPossible().value;
        var typeEndPosition = this.clonePosition();
        switch (argType) {
            case '':
                // Expecting a style string number, date, time, plural, selectordinal, or select.
                return this.error(ErrorKind.EXPECT_ARGUMENT_TYPE, createLocation(typeStartPosition, typeEndPosition));
            case 'number':
            case 'date':
            case 'time': {
                // Parse this range:
                // {name, number, style}
                //              ^-------^
                this.bumpSpace();
                var styleAndLocation = null;
                if (this.bumpIf(',')) {
                    this.bumpSpace();
                    var styleStartPosition = this.clonePosition();
                    var result = this.parseSimpleArgStyleIfPossible();
                    if (result.err) {
                        return result;
                    }
                    var style = trimEnd(result.val);
                    if (style.length === 0) {
                        return this.error(ErrorKind.EXPECT_ARGUMENT_STYLE, createLocation(this.clonePosition(), this.clonePosition()));
                    }
                    var styleLocation = createLocation(styleStartPosition, this.clonePosition());
                    styleAndLocation = { style: style, styleLocation: styleLocation };
                }
                var argCloseResult = this.tryParseArgumentClose(openingBracePosition);
                if (argCloseResult.err) {
                    return argCloseResult;
                }
                var location_1 = createLocation(openingBracePosition, this.clonePosition());
                // Extract style or skeleton
                if (styleAndLocation && startsWith(styleAndLocation === null || styleAndLocation === void 0 ? void 0 : styleAndLocation.style, '::', 0)) {
                    // Skeleton starts with `::`.
                    var skeleton = trimStart(styleAndLocation.style.slice(2));
                    if (argType === 'number') {
                        var result = this.parseNumberSkeletonFromString(skeleton, styleAndLocation.styleLocation);
                        if (result.err) {
                            return result;
                        }
                        return {
                            val: { type: TYPE.number, value: value, location: location_1, style: result.val },
                            err: null,
                        };
                    }
                    else {
                        if (skeleton.length === 0) {
                            return this.error(ErrorKind.EXPECT_DATE_TIME_SKELETON, location_1);
                        }
                        var dateTimePattern = skeleton;
                        // Get "best match" pattern only if locale is passed, if not, let it
                        // pass as-is where `parseDateTimeSkeleton()` will throw an error
                        // for unsupported patterns.
                        if (this.locale) {
                            dateTimePattern = getBestPattern(skeleton, this.locale);
                        }
                        var style = {
                            type: SKELETON_TYPE.dateTime,
                            pattern: dateTimePattern,
                            location: styleAndLocation.styleLocation,
                            parsedOptions: this.shouldParseSkeletons
                                ? parseDateTimeSkeleton(dateTimePattern)
                                : {},
                        };
                        var type = argType === 'date' ? TYPE.date : TYPE.time;
                        return {
                            val: { type: type, value: value, location: location_1, style: style },
                            err: null,
                        };
                    }
                }
                // Regular style or no style.
                return {
                    val: {
                        type: argType === 'number'
                            ? TYPE.number
                            : argType === 'date'
                                ? TYPE.date
                                : TYPE.time,
                        value: value,
                        location: location_1,
                        style: (_a = styleAndLocation === null || styleAndLocation === void 0 ? void 0 : styleAndLocation.style) !== null && _a !== void 0 ? _a : null,
                    },
                    err: null,
                };
            }
            case 'plural':
            case 'selectordinal':
            case 'select': {
                // Parse this range:
                // {name, plural, options}
                //              ^---------^
                var typeEndPosition_1 = this.clonePosition();
                this.bumpSpace();
                if (!this.bumpIf(',')) {
                    return this.error(ErrorKind.EXPECT_SELECT_ARGUMENT_OPTIONS, createLocation(typeEndPosition_1, __assign({}, typeEndPosition_1)));
                }
                this.bumpSpace();
                // Parse offset:
                // {name, plural, offset:1, options}
                //                ^-----^
                //
                // or the first option:
                //
                // {name, plural, one {...} other {...}}
                //                ^--^
                var identifierAndLocation = this.parseIdentifierIfPossible();
                var pluralOffset = 0;
                if (argType !== 'select' && identifierAndLocation.value === 'offset') {
                    if (!this.bumpIf(':')) {
                        return this.error(ErrorKind.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, createLocation(this.clonePosition(), this.clonePosition()));
                    }
                    this.bumpSpace();
                    var result = this.tryParseDecimalInteger(ErrorKind.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, ErrorKind.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE);
                    if (result.err) {
                        return result;
                    }
                    // Parse another identifier for option parsing
                    this.bumpSpace();
                    identifierAndLocation = this.parseIdentifierIfPossible();
                    pluralOffset = result.val;
                }
                var optionsResult = this.tryParsePluralOrSelectOptions(nestingLevel, argType, expectingCloseTag, identifierAndLocation);
                if (optionsResult.err) {
                    return optionsResult;
                }
                var argCloseResult = this.tryParseArgumentClose(openingBracePosition);
                if (argCloseResult.err) {
                    return argCloseResult;
                }
                var location_2 = createLocation(openingBracePosition, this.clonePosition());
                if (argType === 'select') {
                    return {
                        val: {
                            type: TYPE.select,
                            value: value,
                            options: fromEntries(optionsResult.val),
                            location: location_2,
                        },
                        err: null,
                    };
                }
                else {
                    return {
                        val: {
                            type: TYPE.plural,
                            value: value,
                            options: fromEntries(optionsResult.val),
                            offset: pluralOffset,
                            pluralType: argType === 'plural' ? 'cardinal' : 'ordinal',
                            location: location_2,
                        },
                        err: null,
                    };
                }
            }
            default:
                return this.error(ErrorKind.INVALID_ARGUMENT_TYPE, createLocation(typeStartPosition, typeEndPosition));
        }
    };
    Parser.prototype.tryParseArgumentClose = function (openingBracePosition) {
        // Parse: {value, number, ::currency/GBP }
        //
        if (this.isEOF() || this.char() !== 125 /* `}` */) {
            return this.error(ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
        }
        this.bump(); // `}`
        return { val: true, err: null };
    };
    /**
     * See: https://github.com/unicode-org/icu/blob/af7ed1f6d2298013dc303628438ec4abe1f16479/icu4c/source/common/messagepattern.cpp#L659
     */
    Parser.prototype.parseSimpleArgStyleIfPossible = function () {
        var nestedBraces = 0;
        var startPosition = this.clonePosition();
        while (!this.isEOF()) {
            var ch = this.char();
            switch (ch) {
                case 39 /* `'` */: {
                    // Treat apostrophe as quoting but include it in the style part.
                    // Find the end of the quoted literal text.
                    this.bump();
                    var apostrophePosition = this.clonePosition();
                    if (!this.bumpUntil("'")) {
                        return this.error(ErrorKind.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE, createLocation(apostrophePosition, this.clonePosition()));
                    }
                    this.bump();
                    break;
                }
                case 123 /* `{` */: {
                    nestedBraces += 1;
                    this.bump();
                    break;
                }
                case 125 /* `}` */: {
                    if (nestedBraces > 0) {
                        nestedBraces -= 1;
                    }
                    else {
                        return {
                            val: this.message.slice(startPosition.offset, this.offset()),
                            err: null,
                        };
                    }
                    break;
                }
                default:
                    this.bump();
                    break;
            }
        }
        return {
            val: this.message.slice(startPosition.offset, this.offset()),
            err: null,
        };
    };
    Parser.prototype.parseNumberSkeletonFromString = function (skeleton, location) {
        var tokens = [];
        try {
            tokens = parseNumberSkeletonFromString(skeleton);
        }
        catch (e) {
            return this.error(ErrorKind.INVALID_NUMBER_SKELETON, location);
        }
        return {
            val: {
                type: SKELETON_TYPE.number,
                tokens: tokens,
                location: location,
                parsedOptions: this.shouldParseSkeletons
                    ? parseNumberSkeleton(tokens)
                    : {},
            },
            err: null,
        };
    };
    /**
     * @param nesting_level The current nesting level of messages.
     *     This can be positive when parsing message fragment in select or plural argument options.
     * @param parent_arg_type The parent argument's type.
     * @param parsed_first_identifier If provided, this is the first identifier-like selector of
     *     the argument. It is a by-product of a previous parsing attempt.
     * @param expecting_close_tag If true, this message is directly or indirectly nested inside
     *     between a pair of opening and closing tags. The nested message will not parse beyond
     *     the closing tag boundary.
     */
    Parser.prototype.tryParsePluralOrSelectOptions = function (nestingLevel, parentArgType, expectCloseTag, parsedFirstIdentifier) {
        var _a;
        var hasOtherClause = false;
        var options = [];
        var parsedSelectors = new Set();
        var selector = parsedFirstIdentifier.value, selectorLocation = parsedFirstIdentifier.location;
        // Parse:
        // one {one apple}
        // ^--^
        while (true) {
            if (selector.length === 0) {
                var startPosition = this.clonePosition();
                if (parentArgType !== 'select' && this.bumpIf('=')) {
                    // Try parse `={number}` selector
                    var result = this.tryParseDecimalInteger(ErrorKind.EXPECT_PLURAL_ARGUMENT_SELECTOR, ErrorKind.INVALID_PLURAL_ARGUMENT_SELECTOR);
                    if (result.err) {
                        return result;
                    }
                    selectorLocation = createLocation(startPosition, this.clonePosition());
                    selector = this.message.slice(startPosition.offset, this.offset());
                }
                else {
                    break;
                }
            }
            // Duplicate selector clauses
            if (parsedSelectors.has(selector)) {
                return this.error(parentArgType === 'select'
                    ? ErrorKind.DUPLICATE_SELECT_ARGUMENT_SELECTOR
                    : ErrorKind.DUPLICATE_PLURAL_ARGUMENT_SELECTOR, selectorLocation);
            }
            if (selector === 'other') {
                hasOtherClause = true;
            }
            // Parse:
            // one {one apple}
            //     ^----------^
            this.bumpSpace();
            var openingBracePosition = this.clonePosition();
            if (!this.bumpIf('{')) {
                return this.error(parentArgType === 'select'
                    ? ErrorKind.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT
                    : ErrorKind.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT, createLocation(this.clonePosition(), this.clonePosition()));
            }
            var fragmentResult = this.parseMessage(nestingLevel + 1, parentArgType, expectCloseTag);
            if (fragmentResult.err) {
                return fragmentResult;
            }
            var argCloseResult = this.tryParseArgumentClose(openingBracePosition);
            if (argCloseResult.err) {
                return argCloseResult;
            }
            options.push([
                selector,
                {
                    value: fragmentResult.val,
                    location: createLocation(openingBracePosition, this.clonePosition()),
                },
            ]);
            // Keep track of the existing selectors
            parsedSelectors.add(selector);
            // Prep next selector clause.
            this.bumpSpace();
            (_a = this.parseIdentifierIfPossible(), selector = _a.value, selectorLocation = _a.location);
        }
        if (options.length === 0) {
            return this.error(parentArgType === 'select'
                ? ErrorKind.EXPECT_SELECT_ARGUMENT_SELECTOR
                : ErrorKind.EXPECT_PLURAL_ARGUMENT_SELECTOR, createLocation(this.clonePosition(), this.clonePosition()));
        }
        if (this.requiresOtherClause && !hasOtherClause) {
            return this.error(ErrorKind.MISSING_OTHER_CLAUSE, createLocation(this.clonePosition(), this.clonePosition()));
        }
        return { val: options, err: null };
    };
    Parser.prototype.tryParseDecimalInteger = function (expectNumberError, invalidNumberError) {
        var sign = 1;
        var startingPosition = this.clonePosition();
        if (this.bumpIf('+')) ;
        else if (this.bumpIf('-')) {
            sign = -1;
        }
        var hasDigits = false;
        var decimal = 0;
        while (!this.isEOF()) {
            var ch = this.char();
            if (ch >= 48 /* `0` */ && ch <= 57 /* `9` */) {
                hasDigits = true;
                decimal = decimal * 10 + (ch - 48);
                this.bump();
            }
            else {
                break;
            }
        }
        var location = createLocation(startingPosition, this.clonePosition());
        if (!hasDigits) {
            return this.error(expectNumberError, location);
        }
        decimal *= sign;
        if (!isSafeInteger(decimal)) {
            return this.error(invalidNumberError, location);
        }
        return { val: decimal, err: null };
    };
    Parser.prototype.offset = function () {
        return this.position.offset;
    };
    Parser.prototype.isEOF = function () {
        return this.offset() === this.message.length;
    };
    Parser.prototype.clonePosition = function () {
        // This is much faster than `Object.assign` or spread.
        return {
            offset: this.position.offset,
            line: this.position.line,
            column: this.position.column,
        };
    };
    /**
     * Return the code point at the current position of the parser.
     * Throws if the index is out of bound.
     */
    Parser.prototype.char = function () {
        var offset = this.position.offset;
        if (offset >= this.message.length) {
            throw Error('out of bound');
        }
        var code = codePointAt(this.message, offset);
        if (code === undefined) {
            throw Error("Offset ".concat(offset, " is at invalid UTF-16 code unit boundary"));
        }
        return code;
    };
    Parser.prototype.error = function (kind, location) {
        return {
            val: null,
            err: {
                kind: kind,
                message: this.message,
                location: location,
            },
        };
    };
    /** Bump the parser to the next UTF-16 code unit. */
    Parser.prototype.bump = function () {
        if (this.isEOF()) {
            return;
        }
        var code = this.char();
        if (code === 10 /* '\n' */) {
            this.position.line += 1;
            this.position.column = 1;
            this.position.offset += 1;
        }
        else {
            this.position.column += 1;
            // 0 ~ 0x10000 -> unicode BMP, otherwise skip the surrogate pair.
            this.position.offset += code < 0x10000 ? 1 : 2;
        }
    };
    /**
     * If the substring starting at the current position of the parser has
     * the given prefix, then bump the parser to the character immediately
     * following the prefix and return true. Otherwise, don't bump the parser
     * and return false.
     */
    Parser.prototype.bumpIf = function (prefix) {
        if (startsWith(this.message, prefix, this.offset())) {
            for (var i = 0; i < prefix.length; i++) {
                this.bump();
            }
            return true;
        }
        return false;
    };
    /**
     * Bump the parser until the pattern character is found and return `true`.
     * Otherwise bump to the end of the file and return `false`.
     */
    Parser.prototype.bumpUntil = function (pattern) {
        var currentOffset = this.offset();
        var index = this.message.indexOf(pattern, currentOffset);
        if (index >= 0) {
            this.bumpTo(index);
            return true;
        }
        else {
            this.bumpTo(this.message.length);
            return false;
        }
    };
    /**
     * Bump the parser to the target offset.
     * If target offset is beyond the end of the input, bump the parser to the end of the input.
     */
    Parser.prototype.bumpTo = function (targetOffset) {
        if (this.offset() > targetOffset) {
            throw Error("targetOffset ".concat(targetOffset, " must be greater than or equal to the current offset ").concat(this.offset()));
        }
        targetOffset = Math.min(targetOffset, this.message.length);
        while (true) {
            var offset = this.offset();
            if (offset === targetOffset) {
                break;
            }
            if (offset > targetOffset) {
                throw Error("targetOffset ".concat(targetOffset, " is at invalid UTF-16 code unit boundary"));
            }
            this.bump();
            if (this.isEOF()) {
                break;
            }
        }
    };
    /** advance the parser through all whitespace to the next non-whitespace code unit. */
    Parser.prototype.bumpSpace = function () {
        while (!this.isEOF() && _isWhiteSpace(this.char())) {
            this.bump();
        }
    };
    /**
     * Peek at the *next* Unicode codepoint in the input without advancing the parser.
     * If the input has been exhausted, then this returns null.
     */
    Parser.prototype.peek = function () {
        if (this.isEOF()) {
            return null;
        }
        var code = this.char();
        var offset = this.offset();
        var nextCode = this.message.charCodeAt(offset + (code >= 0x10000 ? 2 : 1));
        return nextCode !== null && nextCode !== void 0 ? nextCode : null;
    };
    return Parser;
}());
/**
 * This check if codepoint is alphabet (lower & uppercase)
 * @param codepoint
 * @returns
 */
function _isAlpha(codepoint) {
    return ((codepoint >= 97 && codepoint <= 122) ||
        (codepoint >= 65 && codepoint <= 90));
}
function _isAlphaOrSlash(codepoint) {
    return _isAlpha(codepoint) || codepoint === 47; /* '/' */
}
/** See `parseTag` function docs. */
function _isPotentialElementNameChar(c) {
    return (c === 45 /* '-' */ ||
        c === 46 /* '.' */ ||
        (c >= 48 && c <= 57) /* 0..9 */ ||
        c === 95 /* '_' */ ||
        (c >= 97 && c <= 122) /** a..z */ ||
        (c >= 65 && c <= 90) /* A..Z */ ||
        c == 0xb7 ||
        (c >= 0xc0 && c <= 0xd6) ||
        (c >= 0xd8 && c <= 0xf6) ||
        (c >= 0xf8 && c <= 0x37d) ||
        (c >= 0x37f && c <= 0x1fff) ||
        (c >= 0x200c && c <= 0x200d) ||
        (c >= 0x203f && c <= 0x2040) ||
        (c >= 0x2070 && c <= 0x218f) ||
        (c >= 0x2c00 && c <= 0x2fef) ||
        (c >= 0x3001 && c <= 0xd7ff) ||
        (c >= 0xf900 && c <= 0xfdcf) ||
        (c >= 0xfdf0 && c <= 0xfffd) ||
        (c >= 0x10000 && c <= 0xeffff));
}
/**
 * Code point equivalent of regex `\p{White_Space}`.
 * From: https://www.unicode.org/Public/UCD/latest/ucd/PropList.txt
 */
function _isWhiteSpace(c) {
    return ((c >= 0x0009 && c <= 0x000d) ||
        c === 0x0020 ||
        c === 0x0085 ||
        (c >= 0x200e && c <= 0x200f) ||
        c === 0x2028 ||
        c === 0x2029);
}
/**
 * Code point equivalent of regex `\p{Pattern_Syntax}`.
 * See https://www.unicode.org/Public/UCD/latest/ucd/PropList.txt
 */
function _isPatternSyntax(c) {
    return ((c >= 0x0021 && c <= 0x0023) ||
        c === 0x0024 ||
        (c >= 0x0025 && c <= 0x0027) ||
        c === 0x0028 ||
        c === 0x0029 ||
        c === 0x002a ||
        c === 0x002b ||
        c === 0x002c ||
        c === 0x002d ||
        (c >= 0x002e && c <= 0x002f) ||
        (c >= 0x003a && c <= 0x003b) ||
        (c >= 0x003c && c <= 0x003e) ||
        (c >= 0x003f && c <= 0x0040) ||
        c === 0x005b ||
        c === 0x005c ||
        c === 0x005d ||
        c === 0x005e ||
        c === 0x0060 ||
        c === 0x007b ||
        c === 0x007c ||
        c === 0x007d ||
        c === 0x007e ||
        c === 0x00a1 ||
        (c >= 0x00a2 && c <= 0x00a5) ||
        c === 0x00a6 ||
        c === 0x00a7 ||
        c === 0x00a9 ||
        c === 0x00ab ||
        c === 0x00ac ||
        c === 0x00ae ||
        c === 0x00b0 ||
        c === 0x00b1 ||
        c === 0x00b6 ||
        c === 0x00bb ||
        c === 0x00bf ||
        c === 0x00d7 ||
        c === 0x00f7 ||
        (c >= 0x2010 && c <= 0x2015) ||
        (c >= 0x2016 && c <= 0x2017) ||
        c === 0x2018 ||
        c === 0x2019 ||
        c === 0x201a ||
        (c >= 0x201b && c <= 0x201c) ||
        c === 0x201d ||
        c === 0x201e ||
        c === 0x201f ||
        (c >= 0x2020 && c <= 0x2027) ||
        (c >= 0x2030 && c <= 0x2038) ||
        c === 0x2039 ||
        c === 0x203a ||
        (c >= 0x203b && c <= 0x203e) ||
        (c >= 0x2041 && c <= 0x2043) ||
        c === 0x2044 ||
        c === 0x2045 ||
        c === 0x2046 ||
        (c >= 0x2047 && c <= 0x2051) ||
        c === 0x2052 ||
        c === 0x2053 ||
        (c >= 0x2055 && c <= 0x205e) ||
        (c >= 0x2190 && c <= 0x2194) ||
        (c >= 0x2195 && c <= 0x2199) ||
        (c >= 0x219a && c <= 0x219b) ||
        (c >= 0x219c && c <= 0x219f) ||
        c === 0x21a0 ||
        (c >= 0x21a1 && c <= 0x21a2) ||
        c === 0x21a3 ||
        (c >= 0x21a4 && c <= 0x21a5) ||
        c === 0x21a6 ||
        (c >= 0x21a7 && c <= 0x21ad) ||
        c === 0x21ae ||
        (c >= 0x21af && c <= 0x21cd) ||
        (c >= 0x21ce && c <= 0x21cf) ||
        (c >= 0x21d0 && c <= 0x21d1) ||
        c === 0x21d2 ||
        c === 0x21d3 ||
        c === 0x21d4 ||
        (c >= 0x21d5 && c <= 0x21f3) ||
        (c >= 0x21f4 && c <= 0x22ff) ||
        (c >= 0x2300 && c <= 0x2307) ||
        c === 0x2308 ||
        c === 0x2309 ||
        c === 0x230a ||
        c === 0x230b ||
        (c >= 0x230c && c <= 0x231f) ||
        (c >= 0x2320 && c <= 0x2321) ||
        (c >= 0x2322 && c <= 0x2328) ||
        c === 0x2329 ||
        c === 0x232a ||
        (c >= 0x232b && c <= 0x237b) ||
        c === 0x237c ||
        (c >= 0x237d && c <= 0x239a) ||
        (c >= 0x239b && c <= 0x23b3) ||
        (c >= 0x23b4 && c <= 0x23db) ||
        (c >= 0x23dc && c <= 0x23e1) ||
        (c >= 0x23e2 && c <= 0x2426) ||
        (c >= 0x2427 && c <= 0x243f) ||
        (c >= 0x2440 && c <= 0x244a) ||
        (c >= 0x244b && c <= 0x245f) ||
        (c >= 0x2500 && c <= 0x25b6) ||
        c === 0x25b7 ||
        (c >= 0x25b8 && c <= 0x25c0) ||
        c === 0x25c1 ||
        (c >= 0x25c2 && c <= 0x25f7) ||
        (c >= 0x25f8 && c <= 0x25ff) ||
        (c >= 0x2600 && c <= 0x266e) ||
        c === 0x266f ||
        (c >= 0x2670 && c <= 0x2767) ||
        c === 0x2768 ||
        c === 0x2769 ||
        c === 0x276a ||
        c === 0x276b ||
        c === 0x276c ||
        c === 0x276d ||
        c === 0x276e ||
        c === 0x276f ||
        c === 0x2770 ||
        c === 0x2771 ||
        c === 0x2772 ||
        c === 0x2773 ||
        c === 0x2774 ||
        c === 0x2775 ||
        (c >= 0x2794 && c <= 0x27bf) ||
        (c >= 0x27c0 && c <= 0x27c4) ||
        c === 0x27c5 ||
        c === 0x27c6 ||
        (c >= 0x27c7 && c <= 0x27e5) ||
        c === 0x27e6 ||
        c === 0x27e7 ||
        c === 0x27e8 ||
        c === 0x27e9 ||
        c === 0x27ea ||
        c === 0x27eb ||
        c === 0x27ec ||
        c === 0x27ed ||
        c === 0x27ee ||
        c === 0x27ef ||
        (c >= 0x27f0 && c <= 0x27ff) ||
        (c >= 0x2800 && c <= 0x28ff) ||
        (c >= 0x2900 && c <= 0x2982) ||
        c === 0x2983 ||
        c === 0x2984 ||
        c === 0x2985 ||
        c === 0x2986 ||
        c === 0x2987 ||
        c === 0x2988 ||
        c === 0x2989 ||
        c === 0x298a ||
        c === 0x298b ||
        c === 0x298c ||
        c === 0x298d ||
        c === 0x298e ||
        c === 0x298f ||
        c === 0x2990 ||
        c === 0x2991 ||
        c === 0x2992 ||
        c === 0x2993 ||
        c === 0x2994 ||
        c === 0x2995 ||
        c === 0x2996 ||
        c === 0x2997 ||
        c === 0x2998 ||
        (c >= 0x2999 && c <= 0x29d7) ||
        c === 0x29d8 ||
        c === 0x29d9 ||
        c === 0x29da ||
        c === 0x29db ||
        (c >= 0x29dc && c <= 0x29fb) ||
        c === 0x29fc ||
        c === 0x29fd ||
        (c >= 0x29fe && c <= 0x2aff) ||
        (c >= 0x2b00 && c <= 0x2b2f) ||
        (c >= 0x2b30 && c <= 0x2b44) ||
        (c >= 0x2b45 && c <= 0x2b46) ||
        (c >= 0x2b47 && c <= 0x2b4c) ||
        (c >= 0x2b4d && c <= 0x2b73) ||
        (c >= 0x2b74 && c <= 0x2b75) ||
        (c >= 0x2b76 && c <= 0x2b95) ||
        c === 0x2b96 ||
        (c >= 0x2b97 && c <= 0x2bff) ||
        (c >= 0x2e00 && c <= 0x2e01) ||
        c === 0x2e02 ||
        c === 0x2e03 ||
        c === 0x2e04 ||
        c === 0x2e05 ||
        (c >= 0x2e06 && c <= 0x2e08) ||
        c === 0x2e09 ||
        c === 0x2e0a ||
        c === 0x2e0b ||
        c === 0x2e0c ||
        c === 0x2e0d ||
        (c >= 0x2e0e && c <= 0x2e16) ||
        c === 0x2e17 ||
        (c >= 0x2e18 && c <= 0x2e19) ||
        c === 0x2e1a ||
        c === 0x2e1b ||
        c === 0x2e1c ||
        c === 0x2e1d ||
        (c >= 0x2e1e && c <= 0x2e1f) ||
        c === 0x2e20 ||
        c === 0x2e21 ||
        c === 0x2e22 ||
        c === 0x2e23 ||
        c === 0x2e24 ||
        c === 0x2e25 ||
        c === 0x2e26 ||
        c === 0x2e27 ||
        c === 0x2e28 ||
        c === 0x2e29 ||
        (c >= 0x2e2a && c <= 0x2e2e) ||
        c === 0x2e2f ||
        (c >= 0x2e30 && c <= 0x2e39) ||
        (c >= 0x2e3a && c <= 0x2e3b) ||
        (c >= 0x2e3c && c <= 0x2e3f) ||
        c === 0x2e40 ||
        c === 0x2e41 ||
        c === 0x2e42 ||
        (c >= 0x2e43 && c <= 0x2e4f) ||
        (c >= 0x2e50 && c <= 0x2e51) ||
        c === 0x2e52 ||
        (c >= 0x2e53 && c <= 0x2e7f) ||
        (c >= 0x3001 && c <= 0x3003) ||
        c === 0x3008 ||
        c === 0x3009 ||
        c === 0x300a ||
        c === 0x300b ||
        c === 0x300c ||
        c === 0x300d ||
        c === 0x300e ||
        c === 0x300f ||
        c === 0x3010 ||
        c === 0x3011 ||
        (c >= 0x3012 && c <= 0x3013) ||
        c === 0x3014 ||
        c === 0x3015 ||
        c === 0x3016 ||
        c === 0x3017 ||
        c === 0x3018 ||
        c === 0x3019 ||
        c === 0x301a ||
        c === 0x301b ||
        c === 0x301c ||
        c === 0x301d ||
        (c >= 0x301e && c <= 0x301f) ||
        c === 0x3020 ||
        c === 0x3030 ||
        c === 0xfd3e ||
        c === 0xfd3f ||
        (c >= 0xfe45 && c <= 0xfe46));
}

function pruneLocation(els) {
    els.forEach(function (el) {
        delete el.location;
        if (isSelectElement(el) || isPluralElement(el)) {
            for (var k in el.options) {
                delete el.options[k].location;
                pruneLocation(el.options[k].value);
            }
        }
        else if (isNumberElement(el) && isNumberSkeleton(el.style)) {
            delete el.style.location;
        }
        else if ((isDateElement(el) || isTimeElement(el)) &&
            isDateTimeSkeleton(el.style)) {
            delete el.style.location;
        }
        else if (isTagElement(el)) {
            pruneLocation(el.children);
        }
    });
}
function parse(message, opts) {
    if (opts === void 0) { opts = {}; }
    opts = __assign({ shouldParseSkeletons: true, requiresOtherClause: true }, opts);
    var result = new Parser(message, opts).parse();
    if (result.err) {
        var error = SyntaxError(ErrorKind[result.err.kind]);
        // @ts-expect-error Assign to error object
        error.location = result.err.location;
        // @ts-expect-error Assign to error object
        error.originalMessage = result.err.message;
        throw error;
    }
    if (!(opts === null || opts === void 0 ? void 0 : opts.captureLocation)) {
        pruneLocation(result.val);
    }
    return result.val;
}

var ErrorCode;
(function (ErrorCode) {
    // When we have a placeholder but no value to format
    ErrorCode["MISSING_VALUE"] = "MISSING_VALUE";
    // When value supplied is invalid
    ErrorCode["INVALID_VALUE"] = "INVALID_VALUE";
    // When we need specific Intl API but it's not available
    ErrorCode["MISSING_INTL_API"] = "MISSING_INTL_API";
})(ErrorCode || (ErrorCode = {}));
var FormatError = /** @class */ (function (_super) {
    __extends(FormatError, _super);
    function FormatError(msg, code, originalMessage) {
        var _this = _super.call(this, msg) || this;
        _this.code = code;
        _this.originalMessage = originalMessage;
        return _this;
    }
    FormatError.prototype.toString = function () {
        return "[formatjs Error: ".concat(this.code, "] ").concat(this.message);
    };
    return FormatError;
}(Error));
var InvalidValueError = /** @class */ (function (_super) {
    __extends(InvalidValueError, _super);
    function InvalidValueError(variableId, value, options, originalMessage) {
        return _super.call(this, "Invalid values for \"".concat(variableId, "\": \"").concat(value, "\". Options are \"").concat(Object.keys(options).join('", "'), "\""), ErrorCode.INVALID_VALUE, originalMessage) || this;
    }
    return InvalidValueError;
}(FormatError));
var InvalidValueTypeError = /** @class */ (function (_super) {
    __extends(InvalidValueTypeError, _super);
    function InvalidValueTypeError(value, type, originalMessage) {
        return _super.call(this, "Value for \"".concat(value, "\" must be of type ").concat(type), ErrorCode.INVALID_VALUE, originalMessage) || this;
    }
    return InvalidValueTypeError;
}(FormatError));
var MissingValueError = /** @class */ (function (_super) {
    __extends(MissingValueError, _super);
    function MissingValueError(variableId, originalMessage) {
        return _super.call(this, "The intl string context variable \"".concat(variableId, "\" was not provided to the string \"").concat(originalMessage, "\""), ErrorCode.MISSING_VALUE, originalMessage) || this;
    }
    return MissingValueError;
}(FormatError));

var PART_TYPE;
(function (PART_TYPE) {
    PART_TYPE[PART_TYPE["literal"] = 0] = "literal";
    PART_TYPE[PART_TYPE["object"] = 1] = "object";
})(PART_TYPE || (PART_TYPE = {}));
function mergeLiteral(parts) {
    if (parts.length < 2) {
        return parts;
    }
    return parts.reduce(function (all, part) {
        var lastPart = all[all.length - 1];
        if (!lastPart ||
            lastPart.type !== PART_TYPE.literal ||
            part.type !== PART_TYPE.literal) {
            all.push(part);
        }
        else {
            lastPart.value += part.value;
        }
        return all;
    }, []);
}
function isFormatXMLElementFn(el) {
    return typeof el === 'function';
}
// TODO(skeleton): add skeleton support
function formatToParts(els, locales, formatters, formats, values, currentPluralValue, 
// For debugging
originalMessage) {
    // Hot path for straight simple msg translations
    if (els.length === 1 && isLiteralElement(els[0])) {
        return [
            {
                type: PART_TYPE.literal,
                value: els[0].value,
            },
        ];
    }
    var result = [];
    for (var _i = 0, els_1 = els; _i < els_1.length; _i++) {
        var el = els_1[_i];
        // Exit early for string parts.
        if (isLiteralElement(el)) {
            result.push({
                type: PART_TYPE.literal,
                value: el.value,
            });
            continue;
        }
        // TODO: should this part be literal type?
        // Replace `#` in plural rules with the actual numeric value.
        if (isPoundElement(el)) {
            if (typeof currentPluralValue === 'number') {
                result.push({
                    type: PART_TYPE.literal,
                    value: formatters.getNumberFormat(locales).format(currentPluralValue),
                });
            }
            continue;
        }
        var varName = el.value;
        // Enforce that all required values are provided by the caller.
        if (!(values && varName in values)) {
            throw new MissingValueError(varName, originalMessage);
        }
        var value = values[varName];
        if (isArgumentElement(el)) {
            if (!value || typeof value === 'string' || typeof value === 'number') {
                value =
                    typeof value === 'string' || typeof value === 'number'
                        ? String(value)
                        : '';
            }
            result.push({
                type: typeof value === 'string' ? PART_TYPE.literal : PART_TYPE.object,
                value: value,
            });
            continue;
        }
        // Recursively format plural and select parts' option — which can be a
        // nested pattern structure. The choosing of the option to use is
        // abstracted-by and delegated-to the part helper object.
        if (isDateElement(el)) {
            var style = typeof el.style === 'string'
                ? formats.date[el.style]
                : isDateTimeSkeleton(el.style)
                    ? el.style.parsedOptions
                    : undefined;
            result.push({
                type: PART_TYPE.literal,
                value: formatters
                    .getDateTimeFormat(locales, style)
                    .format(value),
            });
            continue;
        }
        if (isTimeElement(el)) {
            var style = typeof el.style === 'string'
                ? formats.time[el.style]
                : isDateTimeSkeleton(el.style)
                    ? el.style.parsedOptions
                    : formats.time.medium;
            result.push({
                type: PART_TYPE.literal,
                value: formatters
                    .getDateTimeFormat(locales, style)
                    .format(value),
            });
            continue;
        }
        if (isNumberElement(el)) {
            var style = typeof el.style === 'string'
                ? formats.number[el.style]
                : isNumberSkeleton(el.style)
                    ? el.style.parsedOptions
                    : undefined;
            if (style && style.scale) {
                value =
                    value *
                        (style.scale || 1);
            }
            result.push({
                type: PART_TYPE.literal,
                value: formatters
                    .getNumberFormat(locales, style)
                    .format(value),
            });
            continue;
        }
        if (isTagElement(el)) {
            var children = el.children, value_1 = el.value;
            var formatFn = values[value_1];
            if (!isFormatXMLElementFn(formatFn)) {
                throw new InvalidValueTypeError(value_1, 'function', originalMessage);
            }
            var parts = formatToParts(children, locales, formatters, formats, values, currentPluralValue);
            var chunks = formatFn(parts.map(function (p) { return p.value; }));
            if (!Array.isArray(chunks)) {
                chunks = [chunks];
            }
            result.push.apply(result, chunks.map(function (c) {
                return {
                    type: typeof c === 'string' ? PART_TYPE.literal : PART_TYPE.object,
                    value: c,
                };
            }));
        }
        if (isSelectElement(el)) {
            var opt = el.options[value] || el.options.other;
            if (!opt) {
                throw new InvalidValueError(el.value, value, Object.keys(el.options), originalMessage);
            }
            result.push.apply(result, formatToParts(opt.value, locales, formatters, formats, values));
            continue;
        }
        if (isPluralElement(el)) {
            var opt = el.options["=".concat(value)];
            if (!opt) {
                if (!Intl.PluralRules) {
                    throw new FormatError("Intl.PluralRules is not available in this environment.\nTry polyfilling it using \"@formatjs/intl-pluralrules\"\n", ErrorCode.MISSING_INTL_API, originalMessage);
                }
                var rule = formatters
                    .getPluralRules(locales, { type: el.pluralType })
                    .select(value - (el.offset || 0));
                opt = el.options[rule] || el.options.other;
            }
            if (!opt) {
                throw new InvalidValueError(el.value, value, Object.keys(el.options), originalMessage);
            }
            result.push.apply(result, formatToParts(opt.value, locales, formatters, formats, values, value - (el.offset || 0)));
            continue;
        }
    }
    return mergeLiteral(result);
}

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/
// -- MessageFormat --------------------------------------------------------
function mergeConfig(c1, c2) {
    if (!c2) {
        return c1;
    }
    return __assign(__assign(__assign({}, (c1 || {})), (c2 || {})), Object.keys(c1).reduce(function (all, k) {
        all[k] = __assign(__assign({}, c1[k]), (c2[k] || {}));
        return all;
    }, {}));
}
function mergeConfigs(defaultConfig, configs) {
    if (!configs) {
        return defaultConfig;
    }
    return Object.keys(defaultConfig).reduce(function (all, k) {
        all[k] = mergeConfig(defaultConfig[k], configs[k]);
        return all;
    }, __assign({}, defaultConfig));
}
function createFastMemoizeCache(store) {
    return {
        create: function () {
            return {
                get: function (key) {
                    return store[key];
                },
                set: function (key, value) {
                    store[key] = value;
                },
            };
        },
    };
}
function createDefaultFormatters(cache) {
    if (cache === void 0) { cache = {
        number: {},
        dateTime: {},
        pluralRules: {},
    }; }
    return {
        getNumberFormat: memoize(function () {
            var _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return new ((_a = Intl.NumberFormat).bind.apply(_a, __spreadArray([void 0], args, false)))();
        }, {
            cache: createFastMemoizeCache(cache.number),
            strategy: strategies.variadic,
        }),
        getDateTimeFormat: memoize(function () {
            var _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return new ((_a = Intl.DateTimeFormat).bind.apply(_a, __spreadArray([void 0], args, false)))();
        }, {
            cache: createFastMemoizeCache(cache.dateTime),
            strategy: strategies.variadic,
        }),
        getPluralRules: memoize(function () {
            var _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return new ((_a = Intl.PluralRules).bind.apply(_a, __spreadArray([void 0], args, false)))();
        }, {
            cache: createFastMemoizeCache(cache.pluralRules),
            strategy: strategies.variadic,
        }),
    };
}
var IntlMessageFormat = /** @class */ (function () {
    function IntlMessageFormat(message, locales, overrideFormats, opts) {
        if (locales === void 0) { locales = IntlMessageFormat.defaultLocale; }
        var _this = this;
        this.formatterCache = {
            number: {},
            dateTime: {},
            pluralRules: {},
        };
        this.format = function (values) {
            var parts = _this.formatToParts(values);
            // Hot path for straight simple msg translations
            if (parts.length === 1) {
                return parts[0].value;
            }
            var result = parts.reduce(function (all, part) {
                if (!all.length ||
                    part.type !== PART_TYPE.literal ||
                    typeof all[all.length - 1] !== 'string') {
                    all.push(part.value);
                }
                else {
                    all[all.length - 1] += part.value;
                }
                return all;
            }, []);
            if (result.length <= 1) {
                return result[0] || '';
            }
            return result;
        };
        this.formatToParts = function (values) {
            return formatToParts(_this.ast, _this.locales, _this.formatters, _this.formats, values, undefined, _this.message);
        };
        this.resolvedOptions = function () {
            var _a;
            return ({
                locale: ((_a = _this.resolvedLocale) === null || _a === void 0 ? void 0 : _a.toString()) ||
                    Intl.NumberFormat.supportedLocalesOf(_this.locales)[0],
            });
        };
        this.getAst = function () { return _this.ast; };
        // Defined first because it's used to build the format pattern.
        this.locales = locales;
        this.resolvedLocale = IntlMessageFormat.resolveLocale(locales);
        if (typeof message === 'string') {
            this.message = message;
            if (!IntlMessageFormat.__parse) {
                throw new TypeError('IntlMessageFormat.__parse must be set to process `message` of type `string`');
            }
            var _a = opts || {}; _a.formatters; var parseOpts = __rest(_a, ["formatters"]);
            // Parse string messages into an AST.
            this.ast = IntlMessageFormat.__parse(message, __assign(__assign({}, parseOpts), { locale: this.resolvedLocale }));
        }
        else {
            this.ast = message;
        }
        if (!Array.isArray(this.ast)) {
            throw new TypeError('A message must be provided as a String or AST.');
        }
        // Creates a new object with the specified `formats` merged with the default
        // formats.
        this.formats = mergeConfigs(IntlMessageFormat.formats, overrideFormats);
        this.formatters =
            (opts && opts.formatters) || createDefaultFormatters(this.formatterCache);
    }
    Object.defineProperty(IntlMessageFormat, "defaultLocale", {
        get: function () {
            if (!IntlMessageFormat.memoizedDefaultLocale) {
                IntlMessageFormat.memoizedDefaultLocale =
                    new Intl.NumberFormat().resolvedOptions().locale;
            }
            return IntlMessageFormat.memoizedDefaultLocale;
        },
        enumerable: false,
        configurable: true
    });
    IntlMessageFormat.memoizedDefaultLocale = null;
    IntlMessageFormat.resolveLocale = function (locales) {
        if (typeof Intl.Locale === 'undefined') {
            return;
        }
        var supportedLocales = Intl.NumberFormat.supportedLocalesOf(locales);
        if (supportedLocales.length > 0) {
            return new Intl.Locale(supportedLocales[0]);
        }
        return new Intl.Locale(typeof locales === 'string' ? locales : locales[0]);
    };
    IntlMessageFormat.__parse = parse;
    // Default format options used as the prototype of the `formats` provided to the
    // constructor. These are used when constructing the internal Intl.NumberFormat
    // and Intl.DateTimeFormat instances.
    IntlMessageFormat.formats = {
        number: {
            integer: {
                maximumFractionDigits: 0,
            },
            currency: {
                style: 'currency',
            },
            percent: {
                style: 'percent',
            },
        },
        date: {
            short: {
                month: 'numeric',
                day: 'numeric',
                year: '2-digit',
            },
            medium: {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
            },
            long: {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            },
            full: {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            },
        },
        time: {
            short: {
                hour: 'numeric',
                minute: 'numeric',
            },
            medium: {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
            },
            long: {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                timeZoneName: 'short',
            },
            full: {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                timeZoneName: 'short',
            },
        },
    };
    return IntlMessageFormat;
}());

function delve(obj, fullKey) {
  if (fullKey == null)
    return void 0;
  if (fullKey in obj) {
    return obj[fullKey];
  }
  const keys = fullKey.split(".");
  let result = obj;
  for (let p = 0; p < keys.length; p++) {
    if (typeof result === "object") {
      if (p > 0) {
        const partialKey = keys.slice(p, keys.length).join(".");
        if (partialKey in result) {
          result = result[partialKey];
          break;
        }
      }
      result = result[keys[p]];
    } else {
      result = void 0;
    }
  }
  return result;
}

const lookupCache = {};
const addToCache = (path, locale, message) => {
  if (!message)
    return message;
  if (!(locale in lookupCache))
    lookupCache[locale] = {};
  if (!(path in lookupCache[locale]))
    lookupCache[locale][path] = message;
  return message;
};
const lookup = (path, refLocale) => {
  if (refLocale == null)
    return void 0;
  if (refLocale in lookupCache && path in lookupCache[refLocale]) {
    return lookupCache[refLocale][path];
  }
  const locales = getPossibleLocales(refLocale);
  for (let i = 0; i < locales.length; i++) {
    const locale = locales[i];
    const message = getMessageFromDictionary(locale, path);
    if (message) {
      return addToCache(path, refLocale, message);
    }
  }
  return void 0;
};

let dictionary;
const $dictionary = writable({});
function getLocaleDictionary(locale) {
  return dictionary[locale] || null;
}
function hasLocaleDictionary(locale) {
  return locale in dictionary;
}
function getMessageFromDictionary(locale, id) {
  if (!hasLocaleDictionary(locale)) {
    return null;
  }
  const localeDictionary = getLocaleDictionary(locale);
  const match = delve(localeDictionary, id);
  return match;
}
function getClosestAvailableLocale(refLocale) {
  if (refLocale == null)
    return void 0;
  const relatedLocales = getPossibleLocales(refLocale);
  for (let i = 0; i < relatedLocales.length; i++) {
    const locale = relatedLocales[i];
    if (hasLocaleDictionary(locale)) {
      return locale;
    }
  }
  return void 0;
}
function addMessages(locale, ...partials) {
  delete lookupCache[locale];
  $dictionary.update((d) => {
    d[locale] = deepmerge$1.all([d[locale] || {}, ...partials]);
    return d;
  });
}
derived(
  [$dictionary],
  ([dictionary2]) => Object.keys(dictionary2)
);
$dictionary.subscribe((newDictionary) => dictionary = newDictionary);

const queue = {};
function createLocaleQueue(locale) {
  queue[locale] = /* @__PURE__ */ new Set();
}
function removeLoaderFromQueue(locale, loader) {
  queue[locale].delete(loader);
  if (queue[locale].size === 0) {
    delete queue[locale];
  }
}
function getLocaleQueue(locale) {
  return queue[locale];
}
function getLocalesQueues(locale) {
  return getPossibleLocales(locale).map((localeItem) => {
    const localeQueue = getLocaleQueue(localeItem);
    return [localeItem, localeQueue ? [...localeQueue] : []];
  }).filter(([, localeQueue]) => localeQueue.length > 0);
}
function hasLocaleQueue(locale) {
  if (locale == null)
    return false;
  return getPossibleLocales(locale).some(
    (localeQueue) => {
      var _a;
      return (_a = getLocaleQueue(localeQueue)) == null ? void 0 : _a.size;
    }
  );
}
function loadLocaleQueue(locale, localeQueue) {
  const allLoadersPromise = Promise.all(
    localeQueue.map((loader) => {
      removeLoaderFromQueue(locale, loader);
      return loader().then((partial) => partial.default || partial);
    })
  );
  return allLoadersPromise.then((partials) => addMessages(locale, ...partials));
}
const activeFlushes = {};
function flush(locale) {
  if (!hasLocaleQueue(locale)) {
    if (locale in activeFlushes) {
      return activeFlushes[locale];
    }
    return Promise.resolve();
  }
  const queues = getLocalesQueues(locale);
  activeFlushes[locale] = Promise.all(
    queues.map(
      ([localeName, localeQueue]) => loadLocaleQueue(localeName, localeQueue)
    )
  ).then(() => {
    if (hasLocaleQueue(locale)) {
      return flush(locale);
    }
    delete activeFlushes[locale];
  });
  return activeFlushes[locale];
}
function registerLocaleLoader(locale, loader) {
  if (!getLocaleQueue(locale))
    createLocaleQueue(locale);
  const localeQueue = getLocaleQueue(locale);
  if (getLocaleQueue(locale).has(loader))
    return;
  if (!hasLocaleDictionary(locale)) {
    $dictionary.update((d) => {
      d[locale] = {};
      return d;
    });
  }
  localeQueue.add(loader);
}

var __getOwnPropSymbols$2 = Object.getOwnPropertySymbols;
var __hasOwnProp$2 = Object.prototype.hasOwnProperty;
var __propIsEnum$2 = Object.prototype.propertyIsEnumerable;
var __objRest$1 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$2.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$2)
    for (var prop of __getOwnPropSymbols$2(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$2.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const defaultFormats = {
  number: {
    scientific: { notation: "scientific" },
    engineering: { notation: "engineering" },
    compactLong: { notation: "compact", compactDisplay: "long" },
    compactShort: { notation: "compact", compactDisplay: "short" }
  },
  date: {
    short: { month: "numeric", day: "numeric", year: "2-digit" },
    medium: { month: "short", day: "numeric", year: "numeric" },
    long: { month: "long", day: "numeric", year: "numeric" },
    full: { weekday: "long", month: "long", day: "numeric", year: "numeric" }
  },
  time: {
    short: { hour: "numeric", minute: "numeric" },
    medium: { hour: "numeric", minute: "numeric", second: "numeric" },
    long: {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short"
    },
    full: {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short"
    }
  }
};
function defaultMissingKeyHandler({ locale, id }) {
  console.warn(
    `[svelte-i18n] The message "${id}" was not found in "${getPossibleLocales(
      locale
    ).join('", "')}".${hasLocaleQueue(getCurrentLocale()) ? `

Note: there are at least one loader still registered to this locale that wasn't executed.` : ""}`
  );
}
const defaultOptions = {
  fallbackLocale: null,
  loadingDelay: 200,
  formats: defaultFormats,
  warnOnMissingMessages: true,
  handleMissingMessage: void 0,
  ignoreTag: true
};
const options = defaultOptions;
function getOptions() {
  return options;
}
function init(opts) {
  const _a = opts, { formats } = _a, rest = __objRest$1(_a, ["formats"]);
  let initialLocale = opts.fallbackLocale;
  if (opts.initialLocale) {
    try {
      if (IntlMessageFormat.resolveLocale(opts.initialLocale)) {
        initialLocale = opts.initialLocale;
      }
    } catch (e) {
      console.warn(
        `[svelte-i18n] The initial locale "${opts.initialLocale}" is not a valid locale.`
      );
    }
  }
  if (rest.warnOnMissingMessages) {
    delete rest.warnOnMissingMessages;
    if (rest.handleMissingMessage == null) {
      rest.handleMissingMessage = defaultMissingKeyHandler;
    } else {
      console.warn(
        '[svelte-i18n] The "warnOnMissingMessages" option is deprecated. Please use the "handleMissingMessage" option instead.'
      );
    }
  }
  Object.assign(options, rest, { initialLocale });
  if (formats) {
    if ("number" in formats) {
      Object.assign(options.formats.number, formats.number);
    }
    if ("date" in formats) {
      Object.assign(options.formats.date, formats.date);
    }
    if ("time" in formats) {
      Object.assign(options.formats.time, formats.time);
    }
  }
  return $locale.set(initialLocale);
}

const $isLoading = writable(false);

var __defProp$1 = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$1 = Object.getOwnPropertySymbols;
var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
var __propIsEnum$1 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$1 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$1.call(b, prop))
      __defNormalProp$1(a, prop, b[prop]);
  if (__getOwnPropSymbols$1)
    for (var prop of __getOwnPropSymbols$1(b)) {
      if (__propIsEnum$1.call(b, prop))
        __defNormalProp$1(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
let current;
const internalLocale = writable(null);
function getSubLocales(refLocale) {
  return refLocale.split("-").map((_, i, arr) => arr.slice(0, i + 1).join("-")).reverse();
}
function getPossibleLocales(refLocale, fallbackLocale = getOptions().fallbackLocale) {
  const locales = getSubLocales(refLocale);
  if (fallbackLocale) {
    return [.../* @__PURE__ */ new Set([...locales, ...getSubLocales(fallbackLocale)])];
  }
  return locales;
}
function getCurrentLocale() {
  return current != null ? current : void 0;
}
internalLocale.subscribe((newLocale) => {
  current = newLocale != null ? newLocale : void 0;
  if (typeof window !== "undefined" && newLocale != null) {
    document.documentElement.setAttribute("lang", newLocale);
  }
});
const set = (newLocale) => {
  if (newLocale && getClosestAvailableLocale(newLocale) && hasLocaleQueue(newLocale)) {
    const { loadingDelay } = getOptions();
    let loadingTimer;
    if (typeof window !== "undefined" && getCurrentLocale() != null && loadingDelay) {
      loadingTimer = window.setTimeout(
        () => $isLoading.set(true),
        loadingDelay
      );
    } else {
      $isLoading.set(true);
    }
    return flush(newLocale).then(() => {
      internalLocale.set(newLocale);
    }).finally(() => {
      clearTimeout(loadingTimer);
      $isLoading.set(false);
    });
  }
  return internalLocale.set(newLocale);
};
const $locale = __spreadProps(__spreadValues$1({}, internalLocale), {
  set
});
const getLocaleFromNavigator = () => {
  if (typeof window === "undefined")
    return null;
  return window.navigator.language || window.navigator.languages[0];
};

const monadicMemoize = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  const memoizedFn = (arg) => {
    const cacheKey = JSON.stringify(arg);
    if (cacheKey in cache) {
      return cache[cacheKey];
    }
    return cache[cacheKey] = fn(arg);
  };
  return memoizedFn;
};

var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const getIntlFormatterOptions = (type, name) => {
  const { formats } = getOptions();
  if (type in formats && name in formats[type]) {
    return formats[type][name];
  }
  throw new Error(`[svelte-i18n] Unknown "${name}" ${type} format.`);
};
const createNumberFormatter = monadicMemoize(
  (_a) => {
    var _b = _a, { locale, format } = _b, options = __objRest(_b, ["locale", "format"]);
    if (locale == null) {
      throw new Error('[svelte-i18n] A "locale" must be set to format numbers');
    }
    if (format) {
      options = getIntlFormatterOptions("number", format);
    }
    return new Intl.NumberFormat(locale, options);
  }
);
const createDateFormatter = monadicMemoize(
  (_c) => {
    var _d = _c, { locale, format } = _d, options = __objRest(_d, ["locale", "format"]);
    if (locale == null) {
      throw new Error('[svelte-i18n] A "locale" must be set to format dates');
    }
    if (format) {
      options = getIntlFormatterOptions("date", format);
    } else if (Object.keys(options).length === 0) {
      options = getIntlFormatterOptions("date", "short");
    }
    return new Intl.DateTimeFormat(locale, options);
  }
);
const createTimeFormatter = monadicMemoize(
  (_e) => {
    var _f = _e, { locale, format } = _f, options = __objRest(_f, ["locale", "format"]);
    if (locale == null) {
      throw new Error(
        '[svelte-i18n] A "locale" must be set to format time values'
      );
    }
    if (format) {
      options = getIntlFormatterOptions("time", format);
    } else if (Object.keys(options).length === 0) {
      options = getIntlFormatterOptions("time", "short");
    }
    return new Intl.DateTimeFormat(locale, options);
  }
);
const getNumberFormatter = (_g = {}) => {
  var _h = _g, {
    locale = getCurrentLocale()
  } = _h, args = __objRest(_h, [
    "locale"
  ]);
  return createNumberFormatter(__spreadValues({ locale }, args));
};
const getDateFormatter = (_i = {}) => {
  var _j = _i, {
    locale = getCurrentLocale()
  } = _j, args = __objRest(_j, [
    "locale"
  ]);
  return createDateFormatter(__spreadValues({ locale }, args));
};
const getTimeFormatter = (_k = {}) => {
  var _l = _k, {
    locale = getCurrentLocale()
  } = _l, args = __objRest(_l, [
    "locale"
  ]);
  return createTimeFormatter(__spreadValues({ locale }, args));
};
const getMessageFormatter = monadicMemoize(
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  (message, locale = getCurrentLocale()) => new IntlMessageFormat(message, locale, getOptions().formats, {
    ignoreTag: getOptions().ignoreTag
  })
);

const formatMessage = (id, options = {}) => {
  var _a, _b, _c, _d;
  let messageObj = options;
  if (typeof id === "object") {
    messageObj = id;
    id = messageObj.id;
  }
  const {
    values,
    locale = getCurrentLocale(),
    default: defaultValue
  } = messageObj;
  if (locale == null) {
    throw new Error(
      "[svelte-i18n] Cannot format a message without first setting the initial locale."
    );
  }
  let message = lookup(id, locale);
  if (!message) {
    message = (_d = (_c = (_b = (_a = getOptions()).handleMissingMessage) == null ? void 0 : _b.call(_a, { locale, id, defaultValue })) != null ? _c : defaultValue) != null ? _d : id;
  } else if (typeof message !== "string") {
    console.warn(
      `[svelte-i18n] Message with id "${id}" must be of type "string", found: "${typeof message}". Gettin its value through the "$format" method is deprecated; use the "json" method instead.`
    );
    return message;
  }
  if (!values) {
    return message;
  }
  let result = message;
  try {
    result = getMessageFormatter(message, locale).format(values);
  } catch (e) {
    if (e instanceof Error) {
      console.warn(
        `[svelte-i18n] Message "${id}" has syntax error:`,
        e.message
      );
    }
  }
  return result;
};
const formatTime = (t, options) => {
  return getTimeFormatter(options).format(t);
};
const formatDate = (d, options) => {
  return getDateFormatter(options).format(d);
};
const formatNumber = (n, options) => {
  return getNumberFormatter(options).format(n);
};
const getJSON = (id, locale = getCurrentLocale()) => {
  return lookup(id, locale);
};
const $format = derived([$locale, $dictionary], () => formatMessage);
derived([$locale], () => formatTime);
derived([$locale], () => formatDate);
derived([$locale], () => formatNumber);
derived([$locale, $dictionary], () => getJSON);

/* src/App.svelte generated by Svelte v3.59.2 */

const { Error: Error_1, Object: Object_1 } = globals;
const file = "src/App.svelte";

// (1122:39) 
function create_if_block_2(ctx) {
	let div;
	let feedbacklist;
	let updating_chatbot_messages;
	let updating_documents;
	let updating_feedback_list;
	let updating_recording;
	let updating_my_notes;
	let updating_feedback_notes;
	let updating_left_display_styles;
	let current;

	function feedbacklist_chatbot_messages_binding(value) {
		/*feedbacklist_chatbot_messages_binding*/ ctx[25](value);
	}

	function feedbacklist_documents_binding(value) {
		/*feedbacklist_documents_binding*/ ctx[26](value);
	}

	function feedbacklist_feedback_list_binding(value) {
		/*feedbacklist_feedback_list_binding*/ ctx[27](value);
	}

	function feedbacklist_recording_binding(value) {
		/*feedbacklist_recording_binding*/ ctx[28](value);
	}

	function feedbacklist_my_notes_binding(value) {
		/*feedbacklist_my_notes_binding*/ ctx[29](value);
	}

	function feedbacklist_feedback_notes_binding(value) {
		/*feedbacklist_feedback_notes_binding*/ ctx[30](value);
	}

	function feedbacklist_left_display_styles_binding(value) {
		/*feedbacklist_left_display_styles_binding*/ ctx[31](value);
	}

	let feedbacklist_props = {};

	if (/*chatbot_messages*/ ctx[9] !== void 0) {
		feedbacklist_props.chatbot_messages = /*chatbot_messages*/ ctx[9];
	}

	if (/*documents*/ ctx[8] !== void 0) {
		feedbacklist_props.documents = /*documents*/ ctx[8];
	}

	if (/*feedback_list*/ ctx[7] !== void 0) {
		feedbacklist_props.feedback_list = /*feedback_list*/ ctx[7];
	}

	if (/*recording*/ ctx[6] !== void 0) {
		feedbacklist_props.recording = /*recording*/ ctx[6];
	}

	if (/*my_notes*/ ctx[10] !== void 0) {
		feedbacklist_props.my_notes = /*my_notes*/ ctx[10];
	}

	if (/*feedback_notes*/ ctx[11] !== void 0) {
		feedbacklist_props.feedback_notes = /*feedback_notes*/ ctx[11];
	}

	if (/*left_display_styles*/ ctx[5] !== void 0) {
		feedbacklist_props.left_display_styles = /*left_display_styles*/ ctx[5];
	}

	feedbacklist = new FeedbackList({
			props: feedbacklist_props,
			$$inline: true
		});

	binding_callbacks.push(() => bind(feedbacklist, 'chatbot_messages', feedbacklist_chatbot_messages_binding));
	binding_callbacks.push(() => bind(feedbacklist, 'documents', feedbacklist_documents_binding));
	binding_callbacks.push(() => bind(feedbacklist, 'feedback_list', feedbacklist_feedback_list_binding));
	binding_callbacks.push(() => bind(feedbacklist, 'recording', feedbacklist_recording_binding));
	binding_callbacks.push(() => bind(feedbacklist, 'my_notes', feedbacklist_my_notes_binding));
	binding_callbacks.push(() => bind(feedbacklist, 'feedback_notes', feedbacklist_feedback_notes_binding));
	binding_callbacks.push(() => bind(feedbacklist, 'left_display_styles', feedbacklist_left_display_styles_binding));

	const block = {
		c: function create() {
			div = element("div");
			create_component(feedbacklist.$$.fragment);
			set_style(div, "width", "100%");
			set_style(div, "height", "100%");
			set_style(div, "background-color", "#F8F9FA");
			toggle_class(div, "gone", /*currentStep*/ ctx[0] != 2);
			add_location(div, file, 1122, 16, 50106);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			mount_component(feedbacklist, div, null);
			current = true;
		},
		p: function update(ctx, dirty) {
			const feedbacklist_changes = {};

			if (!updating_chatbot_messages && dirty[0] & /*chatbot_messages*/ 512) {
				updating_chatbot_messages = true;
				feedbacklist_changes.chatbot_messages = /*chatbot_messages*/ ctx[9];
				add_flush_callback(() => updating_chatbot_messages = false);
			}

			if (!updating_documents && dirty[0] & /*documents*/ 256) {
				updating_documents = true;
				feedbacklist_changes.documents = /*documents*/ ctx[8];
				add_flush_callback(() => updating_documents = false);
			}

			if (!updating_feedback_list && dirty[0] & /*feedback_list*/ 128) {
				updating_feedback_list = true;
				feedbacklist_changes.feedback_list = /*feedback_list*/ ctx[7];
				add_flush_callback(() => updating_feedback_list = false);
			}

			if (!updating_recording && dirty[0] & /*recording*/ 64) {
				updating_recording = true;
				feedbacklist_changes.recording = /*recording*/ ctx[6];
				add_flush_callback(() => updating_recording = false);
			}

			if (!updating_my_notes && dirty[0] & /*my_notes*/ 1024) {
				updating_my_notes = true;
				feedbacklist_changes.my_notes = /*my_notes*/ ctx[10];
				add_flush_callback(() => updating_my_notes = false);
			}

			if (!updating_feedback_notes && dirty[0] & /*feedback_notes*/ 2048) {
				updating_feedback_notes = true;
				feedbacklist_changes.feedback_notes = /*feedback_notes*/ ctx[11];
				add_flush_callback(() => updating_feedback_notes = false);
			}

			if (!updating_left_display_styles && dirty[0] & /*left_display_styles*/ 32) {
				updating_left_display_styles = true;
				feedbacklist_changes.left_display_styles = /*left_display_styles*/ ctx[5];
				add_flush_callback(() => updating_left_display_styles = false);
			}

			feedbacklist.$set(feedbacklist_changes);

			if (!current || dirty[0] & /*currentStep*/ 1) {
				toggle_class(div, "gone", /*currentStep*/ ctx[0] != 2);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(feedbacklist.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(feedbacklist.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			destroy_component(feedbacklist);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2.name,
		type: "if",
		source: "(1122:39) ",
		ctx
	});

	return block;
}

// (1118:39) 
function create_if_block_1(ctx) {
	let div;
	let feedbackselector;
	let updating_recording;
	let updating_feedback_list;
	let current;

	function feedbackselector_recording_binding(value) {
		/*feedbackselector_recording_binding*/ ctx[23](value);
	}

	function feedbackselector_feedback_list_binding(value) {
		/*feedbackselector_feedback_list_binding*/ ctx[24](value);
	}

	let feedbackselector_props = {};

	if (/*recording*/ ctx[6] !== void 0) {
		feedbackselector_props.recording = /*recording*/ ctx[6];
	}

	if (/*feedback_list*/ ctx[7] !== void 0) {
		feedbackselector_props.feedback_list = /*feedback_list*/ ctx[7];
	}

	feedbackselector = new FeedbackSelector({
			props: feedbackselector_props,
			$$inline: true
		});

	binding_callbacks.push(() => bind(feedbackselector, 'recording', feedbackselector_recording_binding));
	binding_callbacks.push(() => bind(feedbackselector, 'feedback_list', feedbackselector_feedback_list_binding));

	const block = {
		c: function create() {
			div = element("div");
			create_component(feedbackselector.$$.fragment);
			set_style(div, "width", "100%");
			set_style(div, "height", "100%");
			set_style(div, "background-color", "#F8F9FA");
			toggle_class(div, "gone", /*currentStep*/ ctx[0] != 1);
			add_location(div, file, 1118, 16, 49827);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			mount_component(feedbackselector, div, null);
			current = true;
		},
		p: function update(ctx, dirty) {
			const feedbackselector_changes = {};

			if (!updating_recording && dirty[0] & /*recording*/ 64) {
				updating_recording = true;
				feedbackselector_changes.recording = /*recording*/ ctx[6];
				add_flush_callback(() => updating_recording = false);
			}

			if (!updating_feedback_list && dirty[0] & /*feedback_list*/ 128) {
				updating_feedback_list = true;
				feedbackselector_changes.feedback_list = /*feedback_list*/ ctx[7];
				add_flush_callback(() => updating_feedback_list = false);
			}

			feedbackselector.$set(feedbackselector_changes);

			if (!current || dirty[0] & /*currentStep*/ 1) {
				toggle_class(div, "gone", /*currentStep*/ ctx[0] != 1);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(feedbackselector.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(feedbackselector.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			destroy_component(feedbackselector);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(1118:39) ",
		ctx
	});

	return block;
}

// (1084:12) {#if currentStep === 0}
function create_if_block(ctx) {
	let div3;
	let div0;
	let loadingbar;
	let updating_progress;
	let updating_status;
	let t0;
	let div2;
	let label;
	let t1_value = /*$t*/ ctx[12]('Enter your username') + "";
	let t1;
	let t2;
	let input;
	let t3;
	let div1;
	let button0;
	let t5;
	let button1;
	let current;
	let mounted;
	let dispose;

	function loadingbar_progress_binding(value) {
		/*loadingbar_progress_binding*/ ctx[18](value);
	}

	function loadingbar_status_binding(value) {
		/*loadingbar_status_binding*/ ctx[19](value);
	}

	let loadingbar_props = {};

	if (/*progress*/ ctx[3] !== void 0) {
		loadingbar_props.progress = /*progress*/ ctx[3];
	}

	if (/*load_status*/ ctx[4] !== void 0) {
		loadingbar_props.status = /*load_status*/ ctx[4];
	}

	loadingbar = new LoadingBar({ props: loadingbar_props, $$inline: true });
	binding_callbacks.push(() => bind(loadingbar, 'progress', loadingbar_progress_binding));
	binding_callbacks.push(() => bind(loadingbar, 'status', loadingbar_status_binding));

	const block = {
		c: function create() {
			div3 = element("div");
			div0 = element("div");
			create_component(loadingbar.$$.fragment);
			t0 = space();
			div2 = element("div");
			label = element("label");
			t1 = text(t1_value);
			t2 = space();
			input = element("input");
			t3 = space();
			div1 = element("div");
			button0 = element("button");
			button0.textContent = "Register";
			t5 = space();
			button1 = element("button");
			button1.textContent = "Login";
			attr_dev(div0, "class", "overlay centered padded");
			toggle_class(div0, "invisible", /*is_loading*/ ctx[2] === false);
			add_location(div0, file, 1086, 20, 48446);
			attr_dev(label, "for", "username");
			add_location(label, file, 1092, 24, 48755);
			attr_dev(input, "type", "text");
			attr_dev(input, "name", "username");
			attr_dev(input, "id", "username");
			add_location(input, file, 1093, 24, 48839);
			attr_dev(button0, "class", "svelte-lde6tu");
			add_location(button0, file, 1095, 28, 48978);
			attr_dev(button1, "class", "svelte-lde6tu");
			add_location(button1, file, 1104, 28, 49353);
			attr_dev(div1, "class", "row");
			add_location(div1, file, 1094, 24, 48932);
			attr_dev(div2, "class", "column centered spaced");
			set_style(div2, "width", "75%");
			set_style(div2, "height", "75%");
			add_location(div2, file, 1091, 20, 48661);
			attr_dev(div3, "class", "centered spaced");
			set_style(div3, "width", "100%");
			set_style(div3, "height", "100%");
			toggle_class(div3, "gone", /*currentStep*/ ctx[0] != 0);
			add_location(div3, file, 1084, 16, 48330);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div3, anchor);
			append_dev(div3, div0);
			mount_component(loadingbar, div0, null);
			append_dev(div3, t0);
			append_dev(div3, div2);
			append_dev(div2, label);
			append_dev(label, t1);
			append_dev(div2, t2);
			append_dev(div2, input);
			set_input_value(input, /*uname*/ ctx[1]);
			append_dev(div2, t3);
			append_dev(div2, div1);
			append_dev(div1, button0);
			append_dev(div1, t5);
			append_dev(div1, button1);
			current = true;

			if (!mounted) {
				dispose = [
					listen_dev(input, "input", /*input_input_handler*/ ctx[20]),
					listen_dev(button0, "click", /*click_handler_1*/ ctx[21], false, false, false, false),
					listen_dev(button1, "click", /*click_handler_2*/ ctx[22], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			const loadingbar_changes = {};

			if (!updating_progress && dirty[0] & /*progress*/ 8) {
				updating_progress = true;
				loadingbar_changes.progress = /*progress*/ ctx[3];
				add_flush_callback(() => updating_progress = false);
			}

			if (!updating_status && dirty[0] & /*load_status*/ 16) {
				updating_status = true;
				loadingbar_changes.status = /*load_status*/ ctx[4];
				add_flush_callback(() => updating_status = false);
			}

			loadingbar.$set(loadingbar_changes);

			if (!current || dirty[0] & /*is_loading*/ 4) {
				toggle_class(div0, "invisible", /*is_loading*/ ctx[2] === false);
			}

			if ((!current || dirty[0] & /*$t*/ 4096) && t1_value !== (t1_value = /*$t*/ ctx[12]('Enter your username') + "")) set_data_dev(t1, t1_value);

			if (dirty[0] & /*uname*/ 2 && input.value !== /*uname*/ ctx[1]) {
				set_input_value(input, /*uname*/ ctx[1]);
			}

			if (!current || dirty[0] & /*currentStep*/ 1) {
				toggle_class(div3, "gone", /*currentStep*/ ctx[0] != 0);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(loadingbar.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(loadingbar.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div3);
			destroy_component(loadingbar);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(1084:12) {#if currentStep === 0}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let main;
	let div0;
	let h5;
	let t0;
	let t1;
	let t2;
	let button0;
	let t4;
	let div1;
	let current_block_type_index;
	let if_block;
	let t5;
	let div2;
	let button1;
	let img0;
	let img0_src_value;
	let t6;
	let button1_disabled_value;
	let t7;
	let button2;
	let t8;
	let img1;
	let img1_src_value;
	let button2_disabled_value;
	let current;
	let mounted;
	let dispose;
	const if_block_creators = [create_if_block, create_if_block_1, create_if_block_2];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*currentStep*/ ctx[0] === 0) return 0;
		if (/*currentStep*/ ctx[0] === 1) return 1;
		if (/*currentStep*/ ctx[0] === 2) return 2;
		return -1;
	}

	if (~(current_block_type_index = select_block_type(ctx))) {
		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	}

	const block = {
		c: function create() {
			main = element("main");
			div0 = element("div");
			h5 = element("h5");
			t0 = text("Welcome, ");
			t1 = text(/*uname*/ ctx[1]);
			t2 = space();
			button0 = element("button");
			button0.textContent = "Logout";
			t4 = space();
			div1 = element("div");
			if (if_block) if_block.c();
			t5 = space();
			div2 = element("div");
			button1 = element("button");
			img0 = element("img");
			t6 = text("\n                Select Feedback");
			t7 = space();
			button2 = element("button");
			t8 = text("View Feedback List\n                ");
			img1 = element("img");
			add_location(h5, file, 1075, 8, 48087);
			attr_dev(button0, "class", "row mini-padded svelte-lde6tu");
			add_location(button0, file, 1076, 8, 48123);
			attr_dev(div0, "class", "header spaced bordered row padded svelte-lde6tu");
			toggle_class(div0, "gone", /*currentStep*/ ctx[0] == 0);
			add_location(div0, file, 1074, 4, 48002);
			attr_dev(div1, "class", "carousel-container svelte-lde6tu");
			add_location(div1, file, 1080, 1, 48231);
			if (!src_url_equal(img0.src, img0_src_value = "./logos/move-to-the-prev-page-symbol-svgrepo-com.svg")) attr_dev(img0, "src", img0_src_value);
			attr_dev(img0, "alt", "Previous page");
			attr_dev(img0, "class", "mini-icon");
			add_location(img0, file, 1138, 16, 50920);
			attr_dev(button1, "class", "action-button row centered svelte-lde6tu");
			button1.disabled = button1_disabled_value = /*currentStep*/ ctx[0] === 0;
			toggle_class(button1, "invisible", /*currentStep*/ ctx[0] != 2 || /*currentStep*/ ctx[0] == 0);
			add_location(button1, file, 1137, 3, 50745);
			if (!src_url_equal(img1.src, img1_src_value = "./logos/move-to-the-next-page-symbol-svgrepo-com.svg")) attr_dev(img1, "src", img1_src_value);
			attr_dev(img1, "alt", "Next page");
			attr_dev(img1, "class", "mini-icon");
			add_location(img1, file, 1144, 16, 51344);
			attr_dev(button2, "class", "action-button row centered svelte-lde6tu");
			button2.disabled = button2_disabled_value = /*currentStep*/ ctx[0] === /*steps*/ ctx[13].length - 1 || /*feedback_list*/ ctx[7].length <= 0;
			toggle_class(button2, "invisible", /*currentStep*/ ctx[0] != 1 || /*currentStep*/ ctx[0] == 0);
			add_location(button2, file, 1142, 12, 51091);
			attr_dev(div2, "class", "navigation centered spaced bordered row svelte-lde6tu");
			add_location(div2, file, 1136, 1, 50688);
			add_location(main, file, 1073, 0, 47991);
		},
		l: function claim(nodes) {
			throw new Error_1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, main, anchor);
			append_dev(main, div0);
			append_dev(div0, h5);
			append_dev(h5, t0);
			append_dev(h5, t1);
			append_dev(div0, t2);
			append_dev(div0, button0);
			append_dev(main, t4);
			append_dev(main, div1);

			if (~current_block_type_index) {
				if_blocks[current_block_type_index].m(div1, null);
			}

			append_dev(main, t5);
			append_dev(main, div2);
			append_dev(div2, button1);
			append_dev(button1, img0);
			append_dev(button1, t6);
			append_dev(div2, t7);
			append_dev(div2, button2);
			append_dev(button2, t8);
			append_dev(button2, img1);
			current = true;

			if (!mounted) {
				dispose = [
					listen_dev(button0, "click", /*click_handler*/ ctx[17], false, false, false, false),
					listen_dev(button1, "click", /*click_handler_3*/ ctx[32], false, false, false, false),
					listen_dev(button2, "click", /*click_handler_4*/ ctx[33], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (!current || dirty[0] & /*uname*/ 2) set_data_dev(t1, /*uname*/ ctx[1]);

			if (!current || dirty[0] & /*currentStep*/ 1) {
				toggle_class(div0, "gone", /*currentStep*/ ctx[0] == 0);
			}

			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if (~current_block_type_index) {
					if_blocks[current_block_type_index].p(ctx, dirty);
				}
			} else {
				if (if_block) {
					group_outros();

					transition_out(if_blocks[previous_block_index], 1, 1, () => {
						if_blocks[previous_block_index] = null;
					});

					check_outros();
				}

				if (~current_block_type_index) {
					if_block = if_blocks[current_block_type_index];

					if (!if_block) {
						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
						if_block.c();
					} else {
						if_block.p(ctx, dirty);
					}

					transition_in(if_block, 1);
					if_block.m(div1, null);
				} else {
					if_block = null;
				}
			}

			if (!current || dirty[0] & /*currentStep*/ 1 && button1_disabled_value !== (button1_disabled_value = /*currentStep*/ ctx[0] === 0)) {
				prop_dev(button1, "disabled", button1_disabled_value);
			}

			if (!current || dirty[0] & /*currentStep*/ 1) {
				toggle_class(button1, "invisible", /*currentStep*/ ctx[0] != 2 || /*currentStep*/ ctx[0] == 0);
			}

			if (!current || dirty[0] & /*currentStep, feedback_list*/ 129 && button2_disabled_value !== (button2_disabled_value = /*currentStep*/ ctx[0] === /*steps*/ ctx[13].length - 1 || /*feedback_list*/ ctx[7].length <= 0)) {
				prop_dev(button2, "disabled", button2_disabled_value);
			}

			if (!current || dirty[0] & /*currentStep*/ 1) {
				toggle_class(button2, "invisible", /*currentStep*/ ctx[0] != 1 || /*currentStep*/ ctx[0] == 0);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(main);

			if (~current_block_type_index) {
				if_blocks[current_block_type_index].d();
			}

			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let $t;
	validate_store($format, 't');
	component_subscribe($$self, $format, $$value => $$invalidate(12, $t = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('App', slots, []);
	registerLocaleLoader('en', () => Promise.resolve().then(function () { return require('./en-85f1cbad.js'); }));

	// register('ja', () => import('./locales/ja.json'));
	init({
		fallbackLocale: 'en',
		initialLocale: getLocaleFromNavigator()
	});

	let currentStep = 0;
	let steps = 3;
	let uname = "";
	let uID = "";
	let is_loading = false;
	let progress = 0;
	let load_status = "Initializing...";
	let left_display_styles = { 0: "grid", 1: "grid" };
	let recording = {};

	//     "video": null,
	//     "audio": "blob:http://127.0.0.1:5000/e584c5ef-d146-4feb-b00e-d400823c7cc1",
	//     "transcript":`
	//         1 
	//         00:00:00,000 --> 00:00:10,000 
	//         Professor: Alright, let's start with Sarah's 3D rendering. Sarah, could you give us a brief overview of your design concept? 
	//         2 
	//         00:00:10,000 --> 00:00:20,000 
	//         Sarah: Sure, my concept is based on creating a serene and airy living space that maximizes natural light and uses sustainable materials. 
	//         3 
	//         00:00:20,000 --> 00:00:30,000 
	//         Guest Professional 1: I appreciate the focus on sustainability. Can you tell us more about the materials you chose and why? 
	//         4 
	//         00:00:30,000 --> 00:00:40,000 
	//         Sarah: I used reclaimed wood for the flooring and bamboo for the furniture. The idea was to create a warm, inviting atmosphere while being eco-friendly. 
	//         5 
	//         00:00:40,000 --> 00:00:50,000 
	//         Student 1: The use of bamboo is interesting. It reminds me of some modern Japanese interiors I've seen. 
	//         6 
	//         00:00:50,000 --> 00:01:00,000 
	//         Professor: Yes, I see that influence. But I think the space could benefit from more contrast. Right now, it feels a bit too uniform. 
	//         7 
	//         00:01:00,000 --> 00:01:10,000 
	//         Guest Professional 2: I agree. Maybe you could introduce some darker elements to create depth and dimension. What do you think about that? 
	//         8 
	//         00:01:10,000 --> 00:01:20,000 
	//         Sarah: That's a good point. I was worried about making it too dark, but I see how it could add more interest. 
	//         9 
	//         00:01:20,000 --> 00:01:30,000 
	//         Student 2: I think the lighting is really well done. It gives a very airy feel to the space. 
	//         10 
	//         00:01:30,000 --> 00:01:40,000 
	//         Professor: Yes, the lighting is a strong point. But I would suggest rethinking the placement of the windows. They seem a bit too high. 
	//         11 
	//         00:01:40,000 --> 00:01:50,000 
	//         Guest Professional 1: And I would definitely take away the coloring. I think it’s not working for the intent that you want and that you could just use blue Styrofoam. 
	//         12 
	//         00:01:50,000 --> 00:02:00,000 
	//         Sarah: I see. I was trying to create a gradient effect, but maybe it's not coming through as I intended. 
	//         13 
	//         00:02:00,000 --> 00:02:10,000 
	//         Student 3: It reminds me of a Scandinavian design, very minimalistic and clean. 
	//         14 
	//         00:02:10,000 --> 00:02:20,000 
	//         Guest Professional 2: Yes, but Scandinavian designs often have a pop of color or a statement piece. Maybe you could incorporate something like that? 
	//         15 
	//         00:02:20,000 --> 00:02:30,000 
	//         Professor: Good suggestion. Also, consider the long-term vision. How will this space age over time? Will it still feel fresh and inviting? 
	//         16 
	//         00:02:30,000 --> 00:02:40,000 
	//         Sarah: That's a great point. I hadn't thought about the aging aspect. 
	//         17 
	//         00:02:40,000 --> 00:02:50,000 
	//         Guest Professional 1: What made you put color on it with this? 
	//         18 
	//         00:02:50,000 --> 00:03:00,000 
	//         Sarah: I wanted to create a calming effect with soft blues and greens, but I can see how it might be too subtle. 
	//         19 
	//         00:03:00,000 --> 00:03:10,000 
	//         Student 4: I think the furniture layout is very functional. It seems like a space where you could really relax. 
	//         20 
	//         00:03:10,000 --> 00:03:20,000 
	//         Professor: Functional, yes, but it could be more dynamic. Maybe try experimenting with different furniture arrangements. 
	//         21 
	//         00:03:20,000 --> 00:03:30,000 
	//         Guest Professional 2: And consider layering different textures. It could add more depth and interest to the space.
	//         22 
	//         00:03:30,000 --> 00:03:40,000 
	//         Sarah: Layering textures sounds like a good idea. I could try incorporating some textiles or different finishes.
	//         23 
	//         00:03:40,000 --> 00:03:50,000 
	//         Student 5: The open shelving is a nice touch. It makes the space feel more open and accessible. 
	//         24 
	//         00:03:50,000 --> 00:04:00,000 
	//         Professor: Yes, but be careful with open shelving. It can easily become cluttered. Think about how you can maintain that clean look.  
	//         25 
	//         00:04:00,000 --> 00:04:10,000 
	//         Guest Professional 1: I think we need to explore other ways of creating dimension. Maybe it is about materials? Maybe layering? Maybe it is about bunching?  
	//         26 
	//         00:04:10,000 --> 00:04:20,000 
	//         Sarah: I'll definitely experiment with those ideas. Thank you for the suggestions.  
	//         27 
	//         00:04:20,000 --> 00:04:30,000 
	//         Student 6: The use of natural light is really effective. It gives the space a very welcoming feel.  
	//         28 
	//         00:04:30,000 --> 00:04:40,000 
	//         Professor: Agreed, but I think the lighting could be improved. The current fixtures don't seem to complement the overall design.  
	//         29 
	//         00:04:40,000 --> 00:04:50,000 
	//         Guest Professional 2: And I would suggest looking into different types of lighting fixtures. Maybe something more modern or industrial to contrast with the natural elements.
	//         30 
	//         00:04:50,000 --> 00:05:00,000 
	//         Sarah: That's a great idea. I'll look into some different lighting options.  
	//         31 
	//         00:05:00,000 --> 00:05:10,000 
	//         Student 7: The color palette is very soothing. It makes the space feel very calm and peaceful.  
	//         32 
	//         00:05:10,000 --> 00:05:20,000 
	//         Professor: Yes, but as mentioned earlier, it could use more contrast. Maybe introduce some bolder colors in small accents.  
	//         33 
	//         00:05:20,000 --> 00:05:30,000 
	//         Guest Professional 1: And think about the flow of the space. How do people move through it? Are there any areas that feel cramped or awkward?  
	//         34 
	//         00:05:30,000 --> 00:05:40,000 
	//         Sarah: I'll take another look at the layout and see if there are any areas that need more space.  
	//         35 
	//         00:05:40,000 --> 00:05:50,000 
	//         Student 8: The use of plants is a nice touch. It adds a bit of life to the space.  
	//         36 
	//         00:05:50,000 --> 00:06:00,000 
	//         Professor: Yes, but be mindful of maintenance. Some plants require a lot of care. Choose ones that are easy to maintain.  
	//         37 
	//         00:06:00,000 --> 00:06:10,000 
	//         Guest Professional 2: And consider the placement of the plants. They should enhance the space, not clutter it.  
	//         38 
	//         00:06:10,000 --> 00:06:20,000 
	//         Sarah: I'll make sure to choose low-maintenance plants and place them strategically.  
	//         39 
	//         00:06:20,000 --> 00:06:30,000 
	//         Student 9: The overall design feels very cohesive. Everything seems to work well together.
	//         40 
	//         00:06:30,000 --> 00:06:40,000 
	//         Professor: Cohesive, yes, but don't be afraid to take some risks. Sometimes a bold choice can really elevate a design. 
	//         41 
	//         00:06:40,000 --> 00:06:50,000 
	//         Guest Professional 1: And speaking of risks, have you considered incorporating any unique or unconventional elements? 
	//         42 
	//         00:06:50,000 --> 00:07:00,000 
	//         Sarah: I was thinking about adding a statement piece, like a large piece of art or a unique light fixture. 
	//         43 
	//         00:07:00,000 --> 00:07:10,000 
	//         Student 10: That could be interesting. It might add a focal point to the space. 
	//         44 
	//         00:07:10,000 --> 00:07:20,000 
	//         Professor: Yes, a focal point could really help anchor the design. Just make sure it complements the overall aesthetic. 
	//         45 
	//         00:07:20,000 --> 00:07:30,000 
	//         Guest Professional 2: And think about how it interacts with the other elements in the room. It should enhance, not overpower. 
	//         46 
	//         00:07:30,000 --> 00:07:40,000 
	//         Sarah: I'll definitely consider that. Thank you for the feedback. 
	//         47 
	//         00:07:40,000 --> 00:07:50,000 
	//         Student 11: The use of mirrors is clever. It makes the space feel larger and more open. 
	//         48 
	//         00:07:50,000 --> 00:08:00,000 
	//         Professor: Mirrors are a great tool, but be careful not to overdo it. Too many mirrors can make a space feel disorienting. 
	//         49 
	//         00:08:00,000 --> 00:08:10,000 
	//         Guest Professional 1: And think about the placement of the mirrors. They should reflect something interesting, not just another wall. 
	//         50 
	//         00:08:10,000 --> 00:08:20,000 
	//         Sarah: I'll make sure to place them thoughtfully. Thank you for the advice. 
	//         51 
	//         00:08:20,000 --> 00:08:30,000 
	//         Student 12: The choice of furniture is very comfortable-looking. It seems like a space where you could really relax. 
	//         52 
	//         00:08:30,000 --> 00:08:40,000 
	//         Professor: Comfort is important, but also consider the scale of the furniture. Some pieces look a bit oversized for the space. 
	//         53 
	//         00:08:40,000 --> 00:08:50,000 
	//         Guest Professional 2: And think about the balance between form and function. The furniture should be both beautiful and practical. 
	//         54 
	//         00:08:50,000 --> 00:09:00,000 
	//         Sarah: I'll take another look at the furniture choices and see if I can find a better balance. 
	//         55 
	//         00:09:00,000 --> 00:09:10,000 
	//         Student 13: The overall layout is very intuitive. It seems like a space that would be easy to navigate. 
	//         56 
	//         00:09:10,000 --> 00:09:20,000 
	//         Professor: Intuitive, yes, but consider the flow of traffic. Are there any bottlenecks or areas that might feel cramped? 
	//         57 
	//         00:09:20,000 --> 00:09:30,000 
	//         Guest Professional 1: And think about how the space will be used. Are there enough areas for different activities, like reading, entertaining, or working? 
	//         58 
	//         00:09:30,000 --> 00:09:40,000 
	//         Sarah: I'll make sure to consider the different uses of the space and adjust the layout accordingly. 
	//         59 
	//         00:09:40,000 --> 00:09:50,000 
	//         Student 14: The use of natural materials is very appealing. It gives the space a warm, inviting feel. 
	//         60 
	//         00:09:50,000 --> 00:10:00,000 
	//         Professor: Natural materials are great, but be mindful of how they age. Some materials might require more maintenance over time. 
	//         61 
	//         00:10:00,000 --> 00:10:10,000 
	//         Guest Professional 2: And consider mixing natural materials with more modern elements. It could create an interesting contrast.
	//         62 
	//         00:10:10,000 --> 00:10:20,000 
	//         Sarah: I'll definitely explore that idea. Thank you for the suggestion. 
	//         63 
	//         00:10:20,000 --> 00:10:30,000 
	//         Student 15: The overall design feels very balanced. It seems like a space where everything has its place. 
	//         64 
	//         00:10:30,000 --> 00:10:40,000 
	//         Professor: Balance is important, but don't be afraid to play with asymmetry. Sometimes a bit of imbalance can make a design more dynamic. 
	//         65 
	//         00:10:40,000 --> 00:10:50,000 
	//         Guest Professional 1: And think about how you can create focal points. What elements do you want to draw attention to? 
	//         66 
	//         00:10:50,000 --> 00:11:00,000 
	//         Sarah: I'll experiment with some asymmetrical elements and see how it affects the overall design. 
	//         67 
	//         00:11:00,000 --> 00:11:10,000 
	//         Student 16: The use of color is very soothing. It makes the space feel very calm and peaceful. 
	//         68 
	//         00:11:10,000 --> 00:11:20,000 
	//         Professor: Soothing, yes, but as mentioned earlier, it could use more contrast. Maybe introduce some bolder colors in small accents. 
	//         69 
	//         00:11:20,000 --> 00:11:30,000 
	//         Guest Professional 2: And think about how the colors interact with the lighting. Different lighting can change the way colors appear. 
	//         70 
	//         00:11:30,000 --> 00:11:40,000 
	//         Sarah: I'll make sure to consider the lighting when choosing colors. Thank you for the feedback. 
	//         71 
	//         00:11:40,000 --> 00:11:50,000 
	//         Student 17: The overall design feels very cohesive. Everything seems to work well together. 
	//         72 
	//         00:11:50,000 --> 00:12:00,000 
	//         Professor: Cohesive, yes, but don't be afraid to take some risks. Sometimes a bold choice can really elevate a design. 
	//         73 
	//         00:12:00,000 --> 00:12:10,000 
	//         Guest Professional 1: And speaking of risks, have you considered incorporating any unique or unconventional elements? 
	//         74 
	//         00:12:10,000 --> 00:12:20,000 
	//         Sarah: I was thinking about adding a statement piece, like a large piece of art or a unique light fixture. 
	//         75 
	//         00:12:20,000 --> 00:12:30,000 
	//         Student 18: That could be interesting. It might add a focal point to the space. 
	//         76 
	//         00:12:30,000 --> 00:12:40,000 
	//         Professor: Yes, a focal point could really help anchor the design. Just make sure it complements the overall aesthetic. 
	//         77 
	//         00:12:40,000 --> 00:12:50,000 
	//         Guest Professional 2: And think about how it interacts with the other elements in the room. It should enhance, not overpower. 
	//         78 
	//         00:12:50,000 --> 00:13:00,000 
	//         Sarah: I'll definitely consider that. Thank you for the feedback. 
	//         79 
	//         00:13:00,000 --> 00:13:10,000 
	//         Student 19: The use of mirrors is clever. It makes the space feel larger and more open. 
	//         80 
	//         00:13:10,000 --> 00:13:20,000 
	//         Professor: Mirrors are a great tool, but be careful not to overdo it. Too many mirrors can make a space feel disorienting. 
	//         81 
	//         00:13:20,000 --> 00:13:30,000 
	//         Guest Professional 1: And think about the placement of the mirrors. They should reflect something interesting, not just another wall. 
	//         82 
	//         00:13:30,000 --> 00:13:40,000 
	//         Sarah: I'll make sure to place them thoughtfully. Thank you for the advice. 
	//         83 
	//         00:13:40,000 --> 00:13:50,000 
	//         Student 20: The choice of furniture is very comfortable-looking. It seems like a space where you could really relax. 
	//         84 
	//         00:13:50,000 --> 00:14:00,000 
	//         Professor: Comfort is important, but also consider the scale of the furniture. Some pieces look a bit oversized for the space. 
	//         85 
	//         00:14:00,000 --> 00:14:10,000 
	//         Guest Professional 2: And think about the balance between form and function. The furniture should be both beautiful and practical. 
	//         86 
	//         00:14:10,000 --> 00:14:20,000 
	//         Sarah: I'll take another look at the furniture choices and see if I can find a better balance. 
	//         87 
	//         00:14:20,000 --> 00:14:30,000 
	//         Professor: Alright, I think we've covered a lot of ground. Sarah, you've received some excellent feedback. Take some time to digest it and see how you can incorporate it into your design. 
	//         88 
	//         00:14:30,000 --> 00:14:40,000 
	//         Guest Professional 1: Yes, you've done a great job so far. Keep pushing yourself and exploring new ideas. 
	//         89 
	//         00:14:40,000 --> 00:14:50,000 
	//         Guest Professional 2: And remember, design is an iterative process. Don't be afraid to make changes and try new things. 
	//         90 
	//         00:14:50,000 --> 00:15:00,000 
	//         Sarah: Thank you all for the feedback. I really appreciate it and will definitely take it into consideration as I move forward with my design. 
	//         91 
	//         00:15:00,000 --> 00:15:10,000 
	//         Professor: Great. Let's move on to the next student's work. Thank you, Sarah.
	//     `,
	//     "transcript_list": [
	//         {
	//             "dialogue": "Alright, let's start with Sarah's 3D rendering. Sarah, could you give us a brief overview of your design concept? ",
	//             "end_timestamp": "00:00:10,000 ",
	//             "id": 1,
	//             "speaker": "Professor",
	//             "start_timestamp": "00:00:00,000"
	//         },
	//         {
	//             "dialogue": "Sure, my concept is based on creating a serene and airy living space that maximizes natural light and uses sustainable materials. ",
	//             "end_timestamp": "00:00:20,000 ",
	//             "id": 2,
	//             "speaker": "Sarah",
	//             "start_timestamp": "00:00:10,000"
	//         },
	//         {
	//             "dialogue": "I appreciate the focus on sustainability. Can you tell us more about the materials you chose and why?",
	//             "end_timestamp": "00:00:30,000",
	//             "id": 3,
	//             "speaker": "Guest Professional 1",
	//             "start_timestamp": "00:00:20,000"
	//         },
	//         {
	//             "dialogue": "I used reclaimed wood for the flooring and bamboo for the furniture. The idea was to create a warm, inviting atmosphere while being eco-friendly. ",
	//             "end_timestamp": "00:00:43,014",
	//             "id": 4,
	//             "speaker": "Sarah",
	//             "start_timestamp": "00:00:42,333"
	//         },
	//         {
	//             "dialogue": "The use of bamboo is interesting. It reminds me of some modern Japanese interiors I've seen. ",
	//             "end_timestamp": "00:00:52,078",
	//             "id": 5,
	//             "speaker": "Student 1",
	//             "start_timestamp": "00:00:43,074"
	//         },
	//         {
	//             "dialogue": "Yes, I see that influence. But I think the space could benefit from more contrast. Right now, it feels a bit too uniform. ",
	//             "end_timestamp": "00:00:53,139",
	//             "id": 6,
	//             "speaker": "Professor",
	//             "start_timestamp": "00:00:52,098"
	//         },
	//         {
	//             "dialogue": "I agree. Maybe you could introduce some darker elements to create depth and dimension. What do you think about that? ",
	//             "end_timestamp": "00:00:59,197",
	//             "id": 7,
	//             "speaker": "Guest Professional 2",
	//             "start_timestamp": "00:00:57,136"
	//         },
	//         {
	//             "dialogue": "That's a good point. I was worried about making it too dark, but I see how it could add more interest. ",
	//             "end_timestamp": "00:01:08,821",
	//             "id": 8,
	//             "speaker": "Sarah",
	//             "start_timestamp": "00:00:59,837"
	//         },
	//         {
	//             "dialogue": "I think the lighting is really well done. It gives a very airy feel to the space. ",
	//             "end_timestamp": "00:01:11,933",
	//             "id": 9,
	//             "speaker": "Student 2",
	//             "start_timestamp": "00:01:09,471"
	//         },
	//         {
	//             "dialogue": "Yes, the lighting is a strong point. But I would suggest rethinking the placement of the windows. They seem a bit too high.",
	//             "end_timestamp": "00:01:41,357",
	//             "id": 10,
	//             "speaker": "Professor",
	//             "start_timestamp": "00:01:11,953"
	//         },
	//         {
	//             "dialogue": "And I would definitely take away the coloring. I think it’s not working for the intent that you want and that you could just use blue Styrofoam. ",
	//             "end_timestamp": "00:02:13,001",
	//             "id": 11,
	//             "speaker": "Guest Professional 1",
	//             "start_timestamp": "00:01:41,778"
	//         },
	//         {
	//             "dialogue": "I see. I was trying to create a gradient effect, but maybe it's not coming through as I intended. ",
	//             "end_timestamp": "00:02:24,721",
	//             "id": 12,
	//             "speaker": "Sarah",
	//             "start_timestamp": "00:02:15,034"
	//         },
	//         {
	//             "dialogue": "It reminds me of a Scandinavian design, very minimalistic and clean.",
	//             "end_timestamp": "00:02:37,590",
	//             "id": 13,
	//             "speaker": "Student 3",
	//             "start_timestamp": "00:02:26,402"
	//         },
	//         {
	//             "dialogue": "Yes, but Scandinavian designs often have a pop of color or a statement piece. Maybe you could incorporate something like that? ",
	//             "end_timestamp": "00:02:39,071",
	//             "id": 14,
	//             "speaker": "Guest Professional 2",
	//             "start_timestamp": "00:02:38,130"
	//         },
	//         {
	//             "dialogue": "Good suggestion. Also, consider the long-term vision. How will this space age over time? Will it still feel fresh and inviting? ",
	//             "end_timestamp": "00:02:42,052",
	//             "id": 15,
	//             "speaker": "Professor",
	//             "start_timestamp": "00:02:39,111"
	//         },
	//         {
	//             "dialogue": "That's a great point. I hadn't thought about the aging aspect. ",
	//             "end_timestamp": "00:02:55,776",
	//             "id": 16,
	//             "speaker": "Sarah",
	//             "start_timestamp": "00:02:42,293"
	//         },
	//         {
	//             "dialogue": "What made you put color on it with this? ",
	//             "end_timestamp": "00:02:58,977",
	//             "id": 17,
	//             "speaker": "Guest Professional 1",
	//             "start_timestamp": "00:02:55,796"
	//         },
	//         {
	//             "dialogue": "I think the furniture layout is very functional. It seems like a space where you could really relax. ",
	//             "end_timestamp": "00:03:03,523",
	//             "id": 18,
	//             "speaker": "Student 4",
	//             "start_timestamp": "00:02:59,398"
	//         },
	//         {
	//             "dialogue": "Functional, yes, but it could be more dynamic. Maybe try experimenting with different furniture arrangements. ",
	//             "end_timestamp": "00:03:28,492",
	//             "id": 19,
	//             "speaker": "Professor",
	//             "start_timestamp": "00:03:15,502"
	//         },
	//         {
	//             "dialogue": "And consider layering different textures. It could add more depth and interest to the space.",
	//             "end_timestamp": "00:03:32,215",
	//             "id": 20,
	//             "speaker": "Guest Professional 2",
	//             "start_timestamp": "00:03:29,013"
	//         },
	//         {
	//             "dialogue": "Layering textures sounds like a good idea. I could try incorporating some textiles or different finishes.",
	//             "end_timestamp": "00:03:50,046",
	//             "id": 21,
	//             "speaker": "Sarah",
	//             "start_timestamp": "00:03:32,836"
	//         },
	//         {
	//             "dialogue": "The open shelving is a nice touch. It makes the space feel more open and accessible. ",
	//             "end_timestamp": "00:03:55,969",
	//             "id": 22,
	//             "speaker": "Student 5",
	//             "start_timestamp": "00:03:50,887"
	//         },
	//         {
	//             "dialogue": "Yes, but be careful with open shelving. It can easily become cluttered. Think about how you can maintain that clean look.  ",
	//             "end_timestamp": "00:03:58,530",
	//             "id": 23,
	//             "speaker": "Professor",
	//             "start_timestamp": "00:03:55,989"
	//         },
	//         {
	//             "dialogue": "I think we need to explore other ways of creating dimension. Maybe it is about materials? Maybe layering? Maybe it is about bunching?",
	//             "end_timestamp": "00:04:05,833",
	//             "id": 24,
	//             "speaker": "Guest Professional 1",
	//             "start_timestamp": "00:03:59,810"
	//         },
	//         {
	//             "dialogue": "I'll definitely experiment with those ideas. Thank you for the suggestions.",
	//             "end_timestamp": "00:04:10,275",
	//             "id": 25,
	//             "speaker": "Sarah",
	//             "start_timestamp": "00:04:06,413"
	//         },
	//         {
	//             "dialogue": "The use of natural light is really effective. It gives the space a very welcoming feel.",
	//             "end_timestamp": "00:05:00,648",
	//             "id": 26,
	//             "speaker": "Student 6",
	//             "start_timestamp": "00:04:18,762"
	//         },
	//         {
	//             "dialogue": "Agreed, but I think the lighting could be improved. The current fixtures don't seem to complement the overall design.  ",
	//             "end_timestamp": "00:05:08,411",
	//             "id": 27,
	//             "speaker": "Professor",
	//             "start_timestamp": "00:05:01,328"
	//         },
	//         {
	//             "dialogue": "And I would suggest looking into different types of lighting fixtures. Maybe something more modern or industrial to contrast with the natural elements.",
	//             "end_timestamp": "00:05:14,614",
	//             "id": 28,
	//             "speaker": "Guest Professional 2",
	//             "start_timestamp": "00:05:08,431"
	//         },
	//         {
	//             "dialogue": "That's a great idea. I'll look into some different lighting options.  ",
	//             "end_timestamp": "00:05:18,035",
	//             "id": 29,
	//             "speaker": "Sarah",
	//             "start_timestamp": "00:05:16,134"
	//         },
	//         {
	//             "dialogue": "The color palette is very soothing. It makes the space feel very calm and peaceful.  ",
	//             "end_timestamp": "00:05:38,562",
	//             "id": 30,
	//             "speaker": "Student 7",
	//             "start_timestamp": "00:05:19,036"
	//         },
	//         {
	//             "dialogue": "Yes, but as mentioned earlier, it could use more contrast. Maybe introduce some bolder colors in small accents.",
	//             "end_timestamp": "00:05:52,257",
	//             "id": 31,
	//             "speaker": "Professor",
	//             "start_timestamp": "00:05:40,831"
	//         },
	//         {
	//             "dialogue": "And think about the flow of the space. How do people move through it? Are there any areas that feel cramped or awkward?  ",
	//             "end_timestamp": "00:05:56,359",
	//             "id": 32,
	//             "speaker": "Guest Professional 1",
	//             "start_timestamp": "00:05:54,898"
	//         },
	//         {
	//             "dialogue": "I'll take another look at the layout and see if there are any areas that need more space.  ",
	//             "end_timestamp": "00:05:57,340",
	//             "id": 33,
	//             "speaker": "Sarah",
	//             "start_timestamp": "00:05:56,699"
	//         },
	//         {
	//             "dialogue": "The use of plants is a nice touch. It adds a bit of life to the space.",
	//             "end_timestamp": "00:06:03,842",
	//             "id": 34,
	//             "speaker": "Student 8",
	//             "start_timestamp": "00:06:00,121"
	//         },
	//         {
	//             "dialogue": "Yes, but be mindful of maintenance. Some plants require a lot of care. Choose ones that are easy to maintain.",
	//             "end_timestamp": "00:06:12,103",
	//             "id": 35,
	//             "speaker": "Professor",
	//             "start_timestamp": "00:06:04,662"
	//         },
	//         {
	//             "dialogue": "And consider the placement of the plants. They should enhance the space, not clutter it.",
	//             "end_timestamp": "00:06:44,556",
	//             "id": 36,
	//             "speaker": "Guest Professional 2",
	//             "start_timestamp": "00:06:12,364"
	//         },
	//         {
	//             "dialogue": "I'll make sure to choose low-maintenance plants and place them strategically.",
	//             "end_timestamp": "00:06:50,058",
	//             "id": 37,
	//             "speaker": "Sarah",
	//             "start_timestamp": "00:06:44,696"
	//         },
	//         {
	//             "dialogue": "The overall design feels very cohesive. Everything seems to work well together.",
	//             "end_timestamp": "00:06:57,340",
	//             "id": 38,
	//             "speaker": "Student 9",
	//             "start_timestamp": "00:06:50,538"
	//         },
	//         {
	//             "dialogue": "Cohesive, yes, but don't be afraid to take some risks. Sometimes a bold choice can really elevate a design. ",
	//             "end_timestamp": "00:07:07,828",
	//             "id": 39,
	//             "speaker": "Professor",
	//             "start_timestamp": "00:07:01,623"
	//         },
	//         {
	//             "dialogue": "And speaking of risks, have you considered incorporating any unique or unconventional elements? ",
	//             "end_timestamp": "00:07:12,932",
	//             "id": 40,
	//             "speaker": "Guest Professional 1",
	//             "start_timestamp": "00:07:07,848"
	//         },
	//         {
	//             "dialogue": "I was thinking about adding a statement piece, like a large piece of art or a unique light fixture.",
	//             "end_timestamp": "00:07:42,117",
	//             "id": 41,
	//             "speaker": "Sarah",
	//             "start_timestamp": "00:07:14,053"
	//         },
	//         {
	//             "dialogue": "That could be interesting. It might add a focal point to the space.",
	//             "end_timestamp": "00:07:52,113",
	//             "id": 42,
	//             "speaker": "Student 10",
	//             "start_timestamp": "00:07:43,798"
	//         },
	//         {
	//             "dialogue": " Yes, a focal point could really help anchor the design. Just make sure it complements the overall aesthetic. ",
	//             "end_timestamp": "00:08:06,009",
	//             "id": 43,
	//             "speaker": "Professor",
	//             "start_timestamp": "00:07:52,754"
	//         },
	//         {
	//             "dialogue": "And think about how it interacts with the other elements in the room. It should enhance, not overpower. ",
	//             "end_timestamp": "00:08:15,117",
	//             "id": 44,
	//             "speaker": "Guest Professional 2",
	//             "start_timestamp": "00:08:06,850"
	//         },
	//         {
	//             "dialogue": "I'll definitely consider that. Thank you for the feedback.",
	//             "end_timestamp": "00:08:30,049",
	//             "id": 45,
	//             "speaker": "Sarah",
	//             "start_timestamp": "00:08:15,617"
	//         },
	//         {
	//             "dialogue": "The use of mirrors is clever. It makes the space feel larger and more open. ",
	//             "end_timestamp": "00:08:33,051",
	//             "id": 46,
	//             "speaker": "Student 11",
	//             "start_timestamp": "00:08:30,289"
	//         },
	//         {
	//             "dialogue": "Mirrors are a great tool, but be careful not to overdo it. Too many mirrors can make a space feel disorienting.",
	//             "end_timestamp": "00:08:34,712",
	//             "id": 47,
	//             "speaker": "Professor",
	//             "start_timestamp": "00:08:33,431"
	//         },
	//         {
	//             "dialogue": "And think about the placement of the mirrors. They should reflect something interesting, not just another wall. ",
	//             "end_timestamp": "00:09:12,684",
	//             "id": 48,
	//             "speaker": "Guest Professional 1",
	//             "start_timestamp": "00:08:35,533"
	//         },
	//         {
	//             "dialogue": "I'll make sure to place them thoughtfully. Thank you for the advice. ",
	//             "end_timestamp": "00:09:15,165",
	//             "id": 49,
	//             "speaker": "Sarah",
	//             "start_timestamp": "00:09:12,984"
	//         },
	//         {
	//             "dialogue": "The choice of furniture is very comfortable-looking. It seems like a space where you could really relax. ",
	//             "end_timestamp": "00:09:47,989",
	//             "id": 50,
	//             "speaker": "Student 12",
	//             "start_timestamp": "00:09:16,206"
	//         },
	//         {
	//             "dialogue": "Comfort is important, but also consider the scale of the furniture. Some pieces look a bit oversized for the space. ",
	//             "end_timestamp": "00:09:52,211",
	//             "id": 51,
	//             "speaker": "Professor",
	//             "start_timestamp": "00:09:48,469"
	//         },
	//         {
	//             "dialogue": "I'll take another look at the furniture choices and see if I can find a better balance. ",
	//             "end_timestamp": "00:10:09,650",
	//             "id": 52,
	//             "speaker": "Sarah",
	//             "start_timestamp": "00:09:54,838"
	//         },
	//         {
	//             "dialogue": "Alright, I think we've covered a lot of ground. Sarah, you've received some excellent feedback. Take some time to digest it and see how you can incorporate it into your design",
	//             "end_timestamp": "00:10:12,532",
	//             "id": 53,
	//             "speaker": "Professor",
	//             "start_timestamp": "00:10:10,190"
	//         },
	//         {
	//             "dialogue": "Yes, you've done a great job so far. Keep pushing yourself and exploring new ideas. ",
	//             "end_timestamp": "00:10:50,046",
	//             "id": 54,
	//             "speaker": "Guest Professional 1",
	//             "start_timestamp": "00:10:12,813"
	//         },
	//         {
	//             "dialogue": "And remember, design is an iterative process. Don't be afraid to make changes and try new things. ",
	//             "end_timestamp": "00:11:08,428",
	//             "id": 55,
	//             "speaker": "Guest Professional 2",
	//             "start_timestamp": "00:10:51,201"
	//         },
	//         {
	//             "dialogue": "Thank you all for the feedback. I really appreciate it and will definitely take it into consideration as I move forward with my design. ",
	//             "end_timestamp": "00:11:30,044",
	//             "id": 56,
	//             "speaker": "Sarah",
	//             "start_timestamp": "00:11:09,288"
	//         },
	//         {
	//             "dialogue": "Great. Let's move on to the next student's work. Thank you, Sarah.",
	//             "end_timestamp": "00:11:31,085",
	//             "id": 57,
	//             "speaker": "Professor",
	//             "start_timestamp": "00:11:30,845"
	//         },
	//     ]
	// };
	let feedback_list = [];

	let documents = [];

	let chatbot_messages = [
		{
			"content": "You are an expert senior interior designer who is tasked to assist less experienced interior designers like students and junior interior designers with their work by answering their questions on a wide range of interior design topics. ",
			"role": "system"
		}
	];

	let my_notes = [];
	let feedback_notes = {};

	async function register_user() {
		if (uname == null || uname == "") {
			const message = $t('Please_enter_a_valid_username');
			alert(message);
			throw new Error('Please enter a valid username');
		}

		let username_response = await fetch('/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username: uname })
		});

		const data = await username_response.json();

		if (!username_response.ok) {
			alert(data.message);
		} else if (username_response.ok) {
			uID = data.user_id;
			setCookie("username", uname, 30);
			setCookie("user_id", uID, 30);
			$$invalidate(3, progress = 50);
			$$invalidate(4, load_status = "Loading documents...");

			$$invalidate(8, documents = await fetch("/get_documents", {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			}).then(r => r.json()).then(r => r.documents));

			$$invalidate(3, progress = 100);
			$$invalidate(4, load_status = "Done!");
			pause(1500);
			$$invalidate(0, currentStep = 1);
		}
	}

	async function login() {
		if (uname == null || uname == "") {
			const message = $t('Please_enter_a_valid_username');
			alert(message);
			throw new Error('Please enter a valid username');
		}

		let username_response = await fetch('/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username: uname })
		});

		const data = await username_response.json();

		if (!username_response.ok) {
			alert(data.message);
			return;
		} else if (username_response.ok) {
			uID = data.user_id;
			setCookie("username", uname, 30);
			setCookie("user_id", uID, 30);
			await loadFiles();
			$$invalidate(0, currentStep = 1);
		}
	}

	function logout() {
		setCookie("username", "", 0);
		setCookie("user_id", "", 0);
		$$invalidate(1, uname = "");
		uID = "";
		$$invalidate(6, recording = {});
		$$invalidate(10, my_notes = []);
		$$invalidate(11, feedback_notes = {});
		$$invalidate(7, feedback_list = []);
		$$invalidate(8, documents = []);
		$$invalidate(7, feedback_list = []);

		$$invalidate(9, chatbot_messages = [
			{
				"content": "You are an expert senior interior designer who is tasked to assist less experienced interior designers like students and junior interior designers with their work by answering their questions on a wide range of interior design topics. ",
				"role": "system"
			}
		]);

		$$invalidate(0, currentStep = 0);
	}

	async function loadFiles(user_id) {
		$$invalidate(3, progress = 15);
		$$invalidate(4, load_status = "Loading documents...");

		$$invalidate(8, documents = await fetch("/get_documents", {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		}).then(r => r.json()).then(r => r.documents));

		if (Object.keys(recording).length <= 0) {
			$$invalidate(3, progress = 30);
			$$invalidate(4, load_status = "Loading recording...");

			let recording_response = await fetch("/get_recording", {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			});

			let recording_json = await recording_response.json();
			$$invalidate(6, recording = recording_json["recording"]);

			if ("video_path" in recording && recording["video_path"] != null) {
				$$invalidate(3, progress = 45);
				$$invalidate(4, load_status = "Loading video...");

				const vidsrc_response = await fetch("/fetch_video", {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ path: recording["video_path"] })
				});

				if (!vidsrc_response.ok) {
					throw new Error('Failed to fetch video');
				}

				const vidblob = await vidsrc_response.blob();
				$$invalidate(6, recording["video"] = URL.createObjectURL(vidblob), recording);
			}

			if ("audio_path" in recording && recording["audio_path"] != null) {
				$$invalidate(3, progress = 50);
				$$invalidate(4, load_status = "Loading audio...");

				const audiosrc_response = await fetch("/fetch_audio", {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ audio_path: recording["audio_path"] })
				});

				if (!audiosrc_response.ok) {
					throw new Error('Failed to fetch audio');
				}

				const audioblob = await audiosrc_response.blob();
				$$invalidate(6, recording["audio"] = URL.createObjectURL(audioblob), recording);
			}

			$$invalidate(3, progress = 60);
			$$invalidate(4, load_status = "Loading feedback...");

			const feedback_list_response = await fetch("/get_feedback_list", {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			});

			if (!feedback_list_response.ok) {
				throw new Error('Failed to fetch feedback list');
			}

			const feedback_list_json = await feedback_list_response.json();
			$$invalidate(7, feedback_list = feedback_list_json["feedback_list"]);
			$$invalidate(3, progress = 70);
			$$invalidate(4, load_status = "Loading chatbot messages...");

			const display_chatbot_messages_response = await fetch("/get_display_chatbot_messages", {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			});

			if (!display_chatbot_messages_response.ok) {
				throw new Error('Failed to fetch chatbot messages');
			}

			const display_chatbot_messages_json = await display_chatbot_messages_response.json();
			$$invalidate(9, chatbot_messages = display_chatbot_messages_json["display_chatbot_messages"]);

			for (let message of chatbot_messages) {
				if ("image_path" in message && message["image_path"] != null) {
					const imgsrc_response = await fetch("/fetch_image", {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ image_path: message["image_path"] })
					});

					if (!imgsrc_response.ok) {
						throw new Error('Failed to fetch image');
					}

					const imgblob = await imgsrc_response.blob();
					message["image"] = URL.createObjectURL(imgblob);
				}
			}

			$$invalidate(3, progress = 80);
			$$invalidate(4, load_status = "Loading notes...");

			const my_notes_response = await fetch("/get_my_notes", {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			});

			if (!my_notes_response.ok) {
				throw new Error('Failed to fetch my notes');
			}

			const my_notes_json = await my_notes_response.json();
			$$invalidate(10, my_notes = my_notes_json["my_notes"]);

			const feedback_notes_response = await fetch("/get_feedback_notes", {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			});

			if (!feedback_notes_response.ok) {
				throw new Error('Failed to fetch feedback notes');
			}

			const feedback_notes_json = await feedback_notes_response.json();
			$$invalidate(11, feedback_notes = feedback_notes_json["feedback_notes"]);
			$$invalidate(3, progress = 100);
			$$invalidate(4, load_status = "Done!");
			pause(1500);
		}
	}

	onMount(async () => {
		
	}); // uname = getCookie("username");
	// uID = getCookie("user_id");
	// if(uname != null && uname != "") {
	//     await loadFiles(uID);

	const writable_props = [];

	Object_1.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
	});

	const click_handler = () => logout();

	function loadingbar_progress_binding(value) {
		progress = value;
		$$invalidate(3, progress);
	}

	function loadingbar_status_binding(value) {
		load_status = value;
		$$invalidate(4, load_status);
	}

	function input_input_handler() {
		uname = this.value;
		$$invalidate(1, uname);
	}

	const click_handler_1 = async () => {
		$$invalidate(2, is_loading = true);
		await register_user();
		$$invalidate(2, is_loading = false);
		$$invalidate(3, progress = 0);
	};

	const click_handler_2 = async () => {
		$$invalidate(2, is_loading = true);
		await login();
		$$invalidate(2, is_loading = false);
		$$invalidate(3, progress = 0);
	};

	function feedbackselector_recording_binding(value) {
		recording = value;
		$$invalidate(6, recording);
	}

	function feedbackselector_feedback_list_binding(value) {
		feedback_list = value;
		$$invalidate(7, feedback_list);
	}

	function feedbacklist_chatbot_messages_binding(value) {
		chatbot_messages = value;
		$$invalidate(9, chatbot_messages);
	}

	function feedbacklist_documents_binding(value) {
		documents = value;
		$$invalidate(8, documents);
	}

	function feedbacklist_feedback_list_binding(value) {
		feedback_list = value;
		$$invalidate(7, feedback_list);
	}

	function feedbacklist_recording_binding(value) {
		recording = value;
		$$invalidate(6, recording);
	}

	function feedbacklist_my_notes_binding(value) {
		my_notes = value;
		$$invalidate(10, my_notes);
	}

	function feedbacklist_feedback_notes_binding(value) {
		feedback_notes = value;
		$$invalidate(11, feedback_notes);
	}

	function feedbacklist_left_display_styles_binding(value) {
		left_display_styles = value;
		$$invalidate(5, left_display_styles);
	}

	const click_handler_3 = () => {
		$$invalidate(0, currentStep = 1);
	};

	const click_handler_4 = () => {
		$$invalidate(0, currentStep = 2);
	};

	$$self.$capture_state = () => ({
		onMount,
		setCookie,
		getCookie,
		pause,
		FeedbackSelector,
		FeedbackList,
		LoadingBar,
		register: registerLocaleLoader,
		init,
		getLocaleFromNavigator,
		t: $format,
		currentStep,
		steps,
		uname,
		uID,
		is_loading,
		progress,
		load_status,
		left_display_styles,
		recording,
		feedback_list,
		documents,
		chatbot_messages,
		my_notes,
		feedback_notes,
		register_user,
		login,
		logout,
		loadFiles,
		$t
	});

	$$self.$inject_state = $$props => {
		if ('currentStep' in $$props) $$invalidate(0, currentStep = $$props.currentStep);
		if ('steps' in $$props) $$invalidate(13, steps = $$props.steps);
		if ('uname' in $$props) $$invalidate(1, uname = $$props.uname);
		if ('uID' in $$props) uID = $$props.uID;
		if ('is_loading' in $$props) $$invalidate(2, is_loading = $$props.is_loading);
		if ('progress' in $$props) $$invalidate(3, progress = $$props.progress);
		if ('load_status' in $$props) $$invalidate(4, load_status = $$props.load_status);
		if ('left_display_styles' in $$props) $$invalidate(5, left_display_styles = $$props.left_display_styles);
		if ('recording' in $$props) $$invalidate(6, recording = $$props.recording);
		if ('feedback_list' in $$props) $$invalidate(7, feedback_list = $$props.feedback_list);
		if ('documents' in $$props) $$invalidate(8, documents = $$props.documents);
		if ('chatbot_messages' in $$props) $$invalidate(9, chatbot_messages = $$props.chatbot_messages);
		if ('my_notes' in $$props) $$invalidate(10, my_notes = $$props.my_notes);
		if ('feedback_notes' in $$props) $$invalidate(11, feedback_notes = $$props.feedback_notes);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		currentStep,
		uname,
		is_loading,
		progress,
		load_status,
		left_display_styles,
		recording,
		feedback_list,
		documents,
		chatbot_messages,
		my_notes,
		feedback_notes,
		$t,
		steps,
		register_user,
		login,
		logout,
		click_handler,
		loadingbar_progress_binding,
		loadingbar_status_binding,
		input_input_handler,
		click_handler_1,
		click_handler_2,
		feedbackselector_recording_binding,
		feedbackselector_feedback_list_binding,
		feedbacklist_chatbot_messages_binding,
		feedbacklist_documents_binding,
		feedbacklist_feedback_list_binding,
		feedbacklist_recording_binding,
		feedbacklist_my_notes_binding,
		feedbacklist_feedback_notes_binding,
		feedbacklist_left_display_styles_binding,
		click_handler_3,
		click_handler_4
	];
}

class App extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance, create_fragment, safe_not_equal, {}, null, [-1, -1]);

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "App",
			options,
			id: create_fragment.name
		});
	}
}

const app = new App({
  target: document.body,
  props: {
    name: "world",
  },
});

module.exports = app;
//# sourceMappingURL=main.js.map
