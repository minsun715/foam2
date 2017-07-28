/**
 * @license
 * Copyright 2017 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

public class AbstractPropertyInfo: PropertyInfo {
  private var parent: ClassInfo?

  public var classInfo: ClassInfo { return parent! }
  public var name: String { fatalError() }
  public var transient: Bool { fatalError() }
  public var required: Bool { fatalError() }
  public func get(obj: Any) -> Any? { fatalError() }
  public func set(obj: Any, value: Any?) { fatalError() }

  public func partialEval() -> Expr { fatalError() }
  public func compare(_ o1: Any?, _ o2: Any?) -> Int { fatalError() }


/*

  @Override
  public PropertyInfo setClassInfo(ClassInfo p) {
    parent = p;
    return this;
  }

  @Override
  public ClassInfo getClassInfo() {
    return parent;
  }

  @Override
  public void toJSON(foam.lib.json.Outputter outputter, StringBuilder out, Object value) {
    outputter.output(out, value);
  }

  @Override
  public foam.mlang.Expr partialEval() {
    return this;
  }

 */

  public func f(_ obj: FObject) -> Any? {
    return get(obj: obj)
  }

  public func diff(o1: FObject, o2: FObject, diff: inout [String : Any?], prop: PropertyInfo) {
    if ( !FOAM_utils.equals(prop.f(o1), prop.f(o2)) ) {
      diff[prop.name] = prop.f(o2)
    }
  }
}

