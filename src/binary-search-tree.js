const { NotImplementedError } = require('../lib/errors');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.tree = null;
  }

  root() {
    return this.tree;
  }

  addNode(node) {
    if (!this.tree) {
      this.tree = node;
    } else if (!this.has(node.data)) {
      let current = this.tree;

      while (true) {
        if (current.data > node.data) {
          if (current.left) {
            current = current.left;
          } else {
            current.left = node;
            break;
          }
        } else {
          if (current.right) {
            current = current.right;
          } else {
            current.right = node;
            break;
          }
        }
      }
    }
  }

  add(data) {
    const node = new Node(data);
    this.addNode(node);
  }

  findWithParent(data) {
    if (!this.tree) {
      return [null, null];
    } else {
      let current = this.tree;
      let parent = null;

      while (true) {
        if (current.data === data) {
          return [current, parent];
        }
        if (current.data > data) {
          if (current.left) {
            parent = current;
            current = current.left;
          } else {
            return [null, null];
          }
        } else {
          if (current.right) {
            parent = current;
            current = current.right;
          } else {
            return [null, null];
          }
        }
      }
    }
  }

  find(data) {
    return this.findWithParent(data)[0];
  }

  has(data) {
    return !!this.find(data);
  }

  remove(data) {
    const [node, parent] = this.findWithParent(data);

    if (node) {
      if (parent) {
        if (parent.left === node) {
          parent.left = null;
        }
        if (parent.right === node) {
          parent.right = null;
        }
      } else {
        this.tree = null;
      }
      if (node.left) {
        this.addNode(node.left);
      }
      if (node.right) {
        this.addNode(node.right);
      }
    }
  }

  min() {
    if (!this.tree) {
      return null;
    } else {
      let current = this.tree;

      while (current.left) {
        current = current.left;
      }

      return current.data;
    }
  }

  max() {
    if (!this.tree) {
      return null;
    } else {
      let current = this.tree;

      while (current.right) {
        current = current.right;
      }

      return current.data;
    }
  }
}

module.exports = {
  BinarySearchTree
};