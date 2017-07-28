/**
 * @license
 * Copyright 2017 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

public class ContextAwareSupport: ContextAware {
  var x_: X?
  public var x: X {
    get { return x_! }
    set(x) { x_ = x }
  }
}
