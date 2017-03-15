// Use strict mode if on node v4.x.x or v5.x.x
// 'use strict';

const serializer = require( 'comment-serializer' );

const src = `
/**
 * This is the general description.
 *
 * Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
 *
 *     This is a tabbed line (4 spaces)
 *     This is a tabbed line (4 spaces)
 *
 * @title Button
 *
 * @modifier .cta primary coloring
 * @state :hover transition animation on hover
 *
 * @example The example description
 *  <a class="btn" href="#">a.btn</a>
 *
 * @example <button class="btn">button.btn</button>
 *
 * @example <button class="btn cta">button.btn.cta</button>
 *
 * @example
 *  <div class="btn-set">
 *    <button class="btn cta">button.btn.cta</button>
 *    <button class="btn">button.btn</button>
 *  </div>
 */
var foo = 'bar';`;

const mySerializer = serializer({
    parsers: serializer.parsers()
});

const result = mySerializer( src );

// console.log( result );
