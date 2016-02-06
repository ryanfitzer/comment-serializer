var compile = require( '../../lib/tagged-template-string' );

module.exports = compile`// Just some dumb code
for (var i = 0; i < 10; i++) {
    // do something
}

    ${'commentBegin'}
     ${'commentLinePrefix'} This is the general description.
     ${'commentLinePrefix'}
     ${'commentLinePrefix'}     This is a tabbed line (4 spaces)
     ${'commentLinePrefix'}     This is a tabbed line (4 spaces)
     ${'commentLinePrefix'}
     ${'commentLinePrefix'} ${'tagPrefix'}title One Element
     ${'commentLinePrefix'} ${'tagPrefix'}example The description of the example
     ${'commentLinePrefix'}  <div class="flash-block">
     ${'commentLinePrefix'}      <div class="flash-block-content">
     ${'commentLinePrefix'}          Success Message
     ${'commentLinePrefix'}      </div>
     ${'commentLinePrefix'}  </div>
     ${'commentLinePrefix'} ${'tagPrefix'}modifier .flash-block-success JS added class that disables the block disappearing
     ${'commentLinePrefix'} ${'tagPrefix'}state :focus Special animated hover focus state
     ${'commentLinePrefix'} ${'tagPrefix'}state :hover Special animated hover focus state
     ${'commentEnd'}

    ${'commentBegin'}
     ${'commentLinePrefix'} This is the general description.
     ${'commentLinePrefix'}
     ${'commentLinePrefix'}     This is a tabbed line (4 spaces)
     ${'commentLinePrefix'}     This is a tabbed line (4 spaces)
     ${'commentLinePrefix'}
     ${'commentLinePrefix'} ${'tagPrefix'}title One Element
     ${'commentLinePrefix'} ${'tagPrefix'}example The description of the example
     ${'commentLinePrefix'}  <div class="flash-block">
     ${'commentLinePrefix'}      <div class="flash-block-content">
     ${'commentLinePrefix'}          Success Message
     ${'commentLinePrefix'}      </div>
     ${'commentLinePrefix'}  </div>
     ${'commentLinePrefix'} ${'tagPrefix'}modifier .flash-block-success JS added class that disables the block disappearing
     ${'commentLinePrefix'} ${'tagPrefix'}state :focus Special animated hover focus state
     ${'commentLinePrefix'} ${'tagPrefix'}state :hover Special animated hover focus state
     ${'commentEnd'}
    var ryan = 'one';

${'commentBegin'}
 ${'commentLinePrefix'} This is the general description.
 ${'commentLinePrefix'}
 ${'commentLinePrefix'} Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
 ${'commentLinePrefix'}
 ${'commentLinePrefix'}     This is a tabbed line (4 spaces)
 ${'commentLinePrefix'}     This is a tabbed line (4 spaces)
 ${'commentLinePrefix'}
 ${'commentLinePrefix'} ${'tagPrefix'}title Button
 ${'commentLinePrefix'}
 ${'commentLinePrefix'} ${'tagPrefix'}modifier .cta primary coloring
 ${'commentLinePrefix'} ${'tagPrefix'}state :hover transition animation on hover
 ${'commentLinePrefix'}
 ${'commentLinePrefix'} ${'tagPrefix'}example The example description
 ${'commentLinePrefix'}  <a class="btn" href="#">a.btn</a>
 ${'commentLinePrefix'}
 ${'commentLinePrefix'} ${'tagPrefix'}example <button class="btn">button.btn</button>
 ${'commentLinePrefix'}
 ${'commentLinePrefix'} ${'tagPrefix'}example <button class="btn cta">button.btn.cta</button>
 ${'commentLinePrefix'}
 ${'commentLinePrefix'} ${'tagPrefix'}example
 ${'commentLinePrefix'}  <div class="btn-set">
 ${'commentLinePrefix'}    <button class="btn cta">button.btn.cta</button>
 ${'commentLinePrefix'}    <button class="btn">button.btn</button>
 ${'commentLinePrefix'}  </div>
 ${'commentEnd'}
var ryan = 'two';

${'commentBegin'}
 ${'commentLinePrefix'} This is the general description.
 ${'commentLinePrefix'}
 ${'commentLinePrefix'} ${'tagPrefix'}title Three Element
 ${'commentLinePrefix'} ${'tagPrefix'}example
 ${'commentLinePrefix'}  <div class="flash-block">
 ${'commentLinePrefix'}      <div class="flash-block-content">
 ${'commentLinePrefix'}          Success Message
 ${'commentLinePrefix'}      </div>
 ${'commentLinePrefix'}  </div>
 ${'commentLinePrefix'} ${'tagPrefix'}modifier .flash-block-success JS added class that disables the block disappearing
 ${'commentLinePrefix'} ${'tagPrefix'}state :focus Special animated hover focus state
 ${'commentLinePrefix'} ${'tagPrefix'}state :hover Special animated hover focus state
 ${'commentEnd'}
var ryan = 'three';














${'commentBegin'}
 ${'commentLinePrefix'} This is the general description.
 ${'commentLinePrefix'}
 ${'commentLinePrefix'} ${'tagPrefix'}title Four Element
 ${'commentLinePrefix'} ${'tagPrefix'}example
 ${'commentLinePrefix'}  <div class="flash-block">
 ${'commentLinePrefix'}      <div class="flash-block-content">
 ${'commentLinePrefix'}          Success Message
 ${'commentLinePrefix'}      </div>
 ${'commentLinePrefix'}  </div>
 ${'commentLinePrefix'} ${'tagPrefix'}modifier .flash-block-success JS added class that disables the block disappearing
 ${'commentLinePrefix'} ${'tagPrefix'}state :focus Special animated hover focus state
 ${'commentLinePrefix'} ${'tagPrefix'}state :hover Special animated hover focus state
 ${'commentEnd'}
var ryan = 'four';


`;