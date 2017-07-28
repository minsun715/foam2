/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// TODO: make this a functional tree rather than a linked list. (for performance)

class AbstractX: X {
  func get(key: Any) -> Any? {
    return get(x: self, key: key)
  }

  func get(x: X, key: Any) -> Any? { fatalError() }

  func put(key: Any, value: Any) -> X {
    return XI(parent: self, key: key, value: value)
  }

  func putFactory(key: Any, factory: XFactory) -> X {
    return FactoryXI(parent: self, key: key, factory: factory)
  }

  func getInstanceOf(value: Any, type: Any?.Type) -> Any? {
    return (get(key: "facetManager") as! FacetManager).getInstanceOf(
        value: value, type: type, x: self)
  }

  func create<T>(type: T.Type) -> T {
    return (get(key: "facetManager") as! FacetManager).create(type: type, x: self)
  }
}

/** Default implementation of X interface. Stores one key-value binding. **/
class XI: AbstractX {
  final var parent_: X
  final var key_   : Any
  final var value_ : Any

  init(parent: X, key: Any, value: Any) {
    parent_ = parent;
    key_    = key;
    value_  = value;
  }

  var parent: X { get { return parent_ } }

  override func get(x: X, key: Any) -> Any? {
    return FOAM_utils.equals(key, key_) ? value_ : parent.get(x: x, key: key)
  }
}

/** Implementation of X interface when binding a key-factory pair. **/
class FactoryXI: AbstractX {
  final var parent_ : X
  final var key_    : Any
  final var factory_: XFactory

  init(parent: X, key: Any, factory: XFactory) {
    parent_  = parent;
    key_     = key;
    factory_ = factory;
  }

  var parent: X { get { return parent_ } }

  override func get(x: X, key: Any) -> Any? {
    return FOAM_utils.equals(key, key_) ? factory_.create(x: x) : parent.get(x: x, key: key)
  }
}

/** Empty Context. Used to create new contexts. **/
class EmptyX: AbstractX {
  private static var x_: X = EmptyX().put(key: "facetManager", value: SimpleFacetManager())

  private override init() {}

  static var instance: X { get { return x_ } }

  override func get(x: X, key: Any) -> Any? { return nil }
}
