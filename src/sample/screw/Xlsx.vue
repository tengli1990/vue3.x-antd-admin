<template>
  <div class="row">
    <div class="col-xs-12">
      <button :disabled="dataSource.length ? false : true" class="btn btn-success" @click="onExportBtn()">Export</button>
    </div>
  </div>
  <div class="row">
    <a-table :columns="columns" :data-source="dataSource" :scroll="{ x: 1500, y: 300 }"></a-table>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import XLSX from 'xlsx';

  const columns = [
    { title: 'Full Name', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
    { title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
    { title: 'Column 1', dataIndex: 'address', key: '1', width: 150 },
    { title: 'Column 2', dataIndex: 'address', key: '2', width: 150 },
    { title: 'Column 3', dataIndex: 'address', key: '3', width: 150 },
    { title: 'Column 4', dataIndex: 'address', key: '4', width: 150 },
    { title: 'Column 5', dataIndex: 'address', key: '5', width: 150 },
    { title: 'Column 6', dataIndex: 'address', key: '6', width: 150 },
    { title: 'Column 7', dataIndex: 'address', key: '7', width: 150 },
    { title: 'Column 8', dataIndex: 'address', key: '8' }
  ];
  interface DataItem {
    key: number;
    name: string;
    age: number;
    address: string;
  }

  const data: DataItem[] = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `Edrward ${i}`,
      age: 32,
      address: `London Park no. ${i}`
    });
  }
  export default defineComponent({
    setup () {
      return {
        columns: columns,
        dataSource: data
      };
    },
    created () {
      // 获取thead 数据
      // console.log(this.getTheadList(this.columns));
    },
    methods: {
      _suppress (evt: any) {
        evt.stopPropagation();
        evt.preventDefault();
      },
      onExportBtn () {
        const thead: string[] = this.columns.map(item => {
          return item.title;
        });

       const tbody: any[] = this.dataSource.map((item:any) => {
            return this.columns.map(({ dataIndex }:any) => {
              return item[dataIndex];
            });
        });
        this._export({
          exportData: [
            thead,
            ...tbody
          ]
        });
      },
      _export ({ exportData, name = 'sheet' }: any) {
        const ws = XLSX.utils.aoa_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, name);
        XLSX.writeFile(wb, 'sheetjs.xlsx');
      }
    }
  });
</script>

<style scoped></style>
