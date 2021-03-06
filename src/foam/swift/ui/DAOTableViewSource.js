foam.CLASS({
  package: 'foam.swift.ui',
  name: 'DAOTableViewSource',
  requires: [
    'foam.dao.ArraySink',
    'foam.dao.FnSink',
  ],
  swiftImports: [
    'UIKit',
  ],
  swiftImplements: [
    'UITableViewDataSource',
  ],
  properties: [
    {
      class: 'foam.dao.DAOProperty',
      name: 'dao',
      swiftPostSet: function() {/*
if newValue == nil { return }
daoSub = try? newValue!.listen(FnSink_create([
  "fn": { [weak self] str, obj, sub in
    self?.onDAOUpdate()
  } as (String, FObject, Detachable) -> Void,
]), nil)
onDetach(daoSub)
onDAOUpdate()
      */},
    },
    {
      swiftType: 'Detachable?',
      name: 'daoSub',
      swiftPostSet: 'if let o = oldValue as? Detachable { o.detach() }',
    },
    {
      swiftType: 'UITableView?',
      swiftWeak: true,
      name: 'tableView',
      swiftPostSet: 'newValue?.dataSource = self',
    },
    {
      class: 'String',
      name: 'reusableCellIdentifier',
      value: 'CellID',
    },
    {
      class: 'List',
      name: 'daoContents',
    },
    {
      swiftType: '(() -> UITableViewCell)',
      swiftRequiresEscaping: true,
      name: 'rowViewFactory',
    },
    {
      swiftType: '((UITableViewCell, FObject) -> Void)',
      swiftRequiresEscaping: true,
      name: 'rowViewPrepare',
    },
  ],
  listeners: [
    {
      name: 'onDAOUpdate',
      isMerged: true,
      swiftCode: function() {/*
let sink = try? dao!.select(ArraySink_create()) as? ArraySink
daoContents = sink??.array ?? []
tableView?.reloadData()
      */},
    },
  ],
  methods: [
  ],
  swiftCode: function() {/*
public func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
  return daoContents.count
}

public func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
  let cell = tableView.dequeueReusableCell(withIdentifier: reusableCellIdentifier) ?? rowViewFactory()
  rowViewPrepare(cell, daoContents[indexPath.row] as! FObject)
  return cell
}

class SimpleRowView: UITableViewCell {
  let view: UIView
  init(view: UIView, style: UITableViewCellStyle, reuseIdentifier: String?) {
    self.view = view
    super.init(style: style, reuseIdentifier: reuseIdentifier)

    var viewMap: [String:UIView] = ["v":view]
    for v in viewMap.values {
      v.translatesAutoresizingMaskIntoConstraints = false
      addSubview(v)
    }
    addConstraints(NSLayoutConstraint.constraints(
      withVisualFormat: "H:|[v]|",
      options: .alignAllCenterY,
      metrics: nil,
      views: viewMap))
    addConstraints(NSLayoutConstraint.constraints(
      withVisualFormat: "V:|[v]|",
      options: .alignAllCenterY,
      metrics: nil,
      views: viewMap))
  }
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
}
  */},
});
