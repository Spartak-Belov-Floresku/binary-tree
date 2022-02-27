class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {

    let current = this;

    if(!current.root) {
      current.root = new Node(val);
      return this;
    }

    current = current.root;

    while (true) {
      if(val < current.val){
        if(!current.left){
          current.left = new Node(val);
          break;
        }else{
          current = current.left;
        } 
      }else{ 
        if(!current.right){
          current.right = new Node(val);
          break;
        }else{
          current = current.right;
        }
      }
    }

    return this;
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val) {
    let current =  this;

    if(!current.root){
      current.root = new Node(val);
      return this;
    }

    current =  current.root;

    const insertRecursivelyHelper = node =>{
      if(val < node.val){
        if(!node.left){
          node.left = new Node(val);
          return this;
        }else{
          return insertRecursivelyHelper(node.left);
        }
      }else{
        if(!node.right){
          node.right = new Node(val);
          return this;
        }else{
          return insertRecursivelyHelper(node.right);
        }
      }
    }

    return insertRecursivelyHelper(current);
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {

    let current = this;

    if(!current) 
        return undefined;
    
    current = current.root;
    if(current.val === val) 
      return current    

    while(current){
      current = current.val > val? current.left: current.right;
      if(current && current.val === val){
        return current;
      }
    }

    return undefined;
    

  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val) {

    let current = this;

    const findHelper = node => {

      if(!node) return undefined;


      if(node.val === val) return node
      
      return node.val > val? findHelper(node.left): findHelper(node.right);
      
    }

    return findHelper(current.root);

  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {

    let arr = [];
    let current = this.root;

    const dfsPreOrderHelper = node =>{
      
      arr.push(node.val);

      if(node.left) dfsPreOrderHelper(node.left);
      
      if(node.right) dfsPreOrderHelper(node.right);
    }

    if(current) dfsPreOrderHelper(current);

    return arr;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {

    let arr = [];
    let current = this.root;

    const dfsInOrderHelper = node => {

      if(node.left) dfsInOrderHelper(node.left);
      
      arr.push(node.val);
      
      if(node.right) dfsInOrderHelper(node.right);
    }

    if(current) dfsInOrderHelper(current);

    return arr;

  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {

    let arr = [];
    let current = this.root;

    const dfsPostOrderHelper = node =>{
      
      arr.push(node.val);

      if(node.right) dfsPostOrderHelper(node.right);
      
      if(node.left) dfsPostOrderHelper(node.left);

    }

    if(current) dfsPostOrderHelper(current);

    return arr.reverse();

  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {

    let arr1 = [];
    let arr2 = []
    let current = this.root;

    const bfsHelper = () => {

      let node;

      if(arr2.length){

        node = arr2.shift();
        arr1.push(node.val);
        if(node.left)  arr2.push(node.left);
        if(node.right) arr2.push(node.right);
        bfsHelper();

      }
      
    }

    if(current){
      arr2.push(current)
      bfsHelper();
    }

    return arr1;

  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {

    let parent = this.root;

    const removeHelper = (parent, child) => {

      if(!child) return null;


      if(child.val === val){

        if(child.right){

          if(child.left){

            const left = child.left;
            let right  = child.right;

            while(right.left) right = right.left
            

            right.left = child.left;

            parent.val > val? parent.left = child.right: parent.right = child.right
            
          }else{

            parent.val > val? parent.left = child.right: parent.right = child.right
            
          }

        }else{

          parent.val > val? parent.left = null: parent.right = null;

        
        }

        return

      }
      
      child.val > val? removeHelper(child, child.left): removeHelper(child, child.right);
      
    }

    parent.val > val? removeHelper(parent, parent.left): removeHelper(parent, parent.right);
    
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    const arr = this.dfsInOrder();
    if(arr.length >= 2){
      return arr[arr.length-2]
    }
    return undefined;
  }
}

module.exports = BinarySearchTree;
