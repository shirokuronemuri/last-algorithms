type Node = {
  isWord: boolean;
  value: string;
  children: (Node | undefined)[];
  childrenLength: number;
};

export default class Trie {
  root: Node;
  constructor() {
    this.root = this.createNode('');
  }

  private createNode(str: string): Node {
    return { children: new Array(26), isWord: false, value: str, childrenLength: 0 };
  }

  private getIndex(str: string) {
    return str.charCodeAt(0) - 'a'.charCodeAt(0);
  }

  insert(item: string): void {
    let curr = this.root;
    for (let ch of item.toLowerCase()) {
      const idx = this.getIndex(ch);
      if (curr.children[idx]) {
        curr = curr.children[idx]!;
      } else {
        const node = this.createNode(ch);
        ++node.childrenLength;
        curr.children[idx] = node;
        curr = node;
      }
    }
    curr.isWord = true;
  }

  private deleteNode(node: Node, str: string, depth: number): boolean {
    if (depth === str.length) {
      if (node.isWord) {
        node.isWord = false;
        return node.childrenLength === 0;
      } else {
        return false;
      }
    }

    const childIdx = this.getIndex(str[depth]!);
    const childNode = node.children[childIdx];
    if (!childNode) {
      return false;
    }
    if (this.deleteNode(childNode, str, depth + 1)) {
      node.children[childIdx] = undefined;
      --node.childrenLength;
    }
    return node.childrenLength === 0 && !node.isWord;
  }

  delete(item: string): void {
    this.deleteNode(this.root, item, 0);
  }

  private findPartialNode(node: Node, partial: string): Node | undefined {
    let curr = node;
    for (let i = 0; i < partial.length; ++i) {
      const childIdx = this.getIndex(partial[i]!);
      const childNode = curr.children[childIdx];
      if (!childNode) {
        return;
      }
      curr = childNode;
    }
    return curr;
  }

  private findWords(node: Node | undefined, word: string, list: string[]): void {
    if (!node) {
      return;
    }
    if (node.isWord) {
      list.push(word);
    }
    for (let child of node.children) {
      this.findWords(child, word + child?.value, list);
    }
  }

  find(partial: string): string[] {
    const words: string[] = [];
    const wordNode = this.findPartialNode(this.root, partial);
    this.findWords(wordNode, partial, words);
    return words;
  }
}
