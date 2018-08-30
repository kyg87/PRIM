import { Component, OnInit, ViewChild } from '@angular/core';
import { Tree } from '../../components/tree/tree';
import {NodeService} from '../service/nodeservice';
import {Message,MenuItem,TreeNode, TreeDragDropService} from '../../components/common/api';
@Component({
  selector: 'app-sys-program',
  templateUrl: './sys-program.component.html',
  styleUrls: ['./sys-program.component.css'],
  providers: [TreeDragDropService]
})
export class SysProgramComponent implements OnInit {

  msgs: Message[];

  @ViewChild('expandingTree')
  expandingTree: Tree;

  filesTree0: TreeNode[];
  filesTree1: TreeNode[];
  filesTree2: TreeNode[];
  filesTree3: TreeNode[];
  filesTree4: TreeNode[];
  filesTree5: TreeNode[];
  filesTree6: TreeNode[];
  filesTree7: TreeNode[];
  filesTree8: TreeNode[];
  filesTree9: TreeNode[];
  filesTree10: TreeNode[];
  filesTree11: TreeNode[];

  filesTree99: TreeNode[];
  
  lazyFiles: TreeNode[];
  
  selectedFile: TreeNode;
  
  selectedFile2: TreeNode;
  
  selectedFile3: TreeNode;
  
  selectedFiles: TreeNode[];
  
  selectedFiles2: TreeNode[];

  selectedFile99: TreeNode;
  
  items: MenuItem[];
  
  loading: boolean;
      
  constructor(private nodeService: NodeService) { }

  ngOnInit() {
      this.loading = true;
      this.nodeService.getFiles().then(files => this.filesTree0 = files);
      setTimeout(() => {
          this.nodeService.getFiles().then(files => this.filesTree1 = files);
          this.loading = false;
      }, 3000);
      this.nodeService.getFiles().then(files => {
        this.filesTree2 = files;
        console.log(this.filesTree2);
      } );
      this.nodeService.getFiles().then(files => this.filesTree3 = files);
      this.nodeService.getFiles().then(files => this.filesTree4 = files);
      this.nodeService.getFiles().then(files => this.filesTree5 = files);
      this.nodeService.getFiles().then(files => this.filesTree6 = files);
      this.nodeService.getFiles().then(files => this.filesTree7 = files);
      this.filesTree8 = [
          {
              label: "Backup",
              data: "Backup Folder",
              expandedIcon: "fa-folder-open",
              collapsedIcon: "fa-folder"
          }
      ];
      this.filesTree9 = [
          {
              label: "Storage",
              data: "Storage Folder",
              expandedIcon: "fa-folder-open",
              collapsedIcon: "fa-folder"
          }
      ];
      this.filesTree99 = [
        {
            label: "Storage",
            data: "Storage Folder",
            expandedIcon: "fa-folder-open",
            collapsedIcon: "fa-folder"
        }
    ];

      this.nodeService.getFiles().then(files => this.filesTree10 = files);
      this.nodeService.getFiles().then(files => {
          this.filesTree11 = [{
              label: 'Root',
              children: files
          }];
      });

      this.nodeService.getLazyFiles().then(files => this.lazyFiles = files);
      
      this.items = [
          {label: 'View', icon: 'fa-search', command: (event) => this.viewFile(this.selectedFile2)},
          {label: 'Unselect', icon: 'fa-close', command: (event) => this.unselectFile()}
      ];
  }
  
  nodeSelect(event) {
      this.msgs = [];
      this.msgs.push({severity: 'info', summary: 'Node Selected', detail: event.node.label});
  }
  
  nodeUnselect(event) {
      this.msgs = [];
      this.msgs.push({severity: 'info', summary: 'Node Unselected', detail: event.node.label});
  }

  nodeExpandMessage(event) {
      this.msgs = [];
      this.msgs.push({severity: 'info', summary: 'Node Expanded', detail: event.node.label});
  }
  
  nodeExpand(event) {
      if(event.node) {
          //in a real application, make a call to a remote url to load children of the current node and add the new nodes as children
          this.nodeService.getLazyFiles().then(nodes => event.node.children = nodes);
      }
  }
  
  viewFile(file: TreeNode) {
      this.msgs = [];
      this.msgs.push({severity: 'info', summary: 'Node Selected with Right Click', detail: file.label});
  }
  
  unselectFile() {
      this.selectedFile2 = null;
  }

  expandAll(){
      this.filesTree10.forEach( node => {
          this.expandRecursive(node, true);
      } );
  }

  collapseAll(){
      this.filesTree10.forEach( node => {
          this.expandRecursive(node, false);
      } );
  }

  onNodeDrop(event){
    console.log(event)

    var data = [];
    data.push(event.dragNode)
    this.filesTree99 =  this.filesTree9;

    console.log(this.filesTree9);

    for(var i =0; i < this.filesTree9.length;i++){
      this.checkchild(this.filesTree9[i])
    }

  }

  checkchild(data){
    console.log(data.label)
    if(data.children != undefined){
      for(var i =0; i < data.children.length; i++){
        //console.log(data.children[i].label);
        this.checkchild(data.children[i]);
      }

    }
  }
  
  private expandRecursive(node:TreeNode, isExpand:boolean){
      node.expanded = isExpand;
      if(node.children){
          node.children.forEach( childNode => {
              this.expandRecursive(childNode, isExpand);
          } );
      }
  }
}
