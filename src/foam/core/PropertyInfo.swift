/**
 * @license
 * Copyright 2017 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

public protocol PropertyInfo: Expr, Comparator {
  var classInfo: ClassInfo { get }
  var transient: Bool { get }
  var required: Bool { get }
  var name: String { get }
  func get(obj: Any) -> Any?
  func set(obj: Any, value: Any?)

/*
  public Parser jsonParser();
  public void toJSON(foam.lib.json.Outputter outputter, StringBuilder out, Object value);

 */
  func diff(o1: FObject, o2: FObject, diff: inout [String:Any?], prop: PropertyInfo)
}
