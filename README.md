elFinder + AngularJS
======

```html
<div class="el-finder"
     url="/elfinder"
     toolbar="mkdir,mkfile,upload|open,download|info|copy,cut"
     contextmenu-navbar="open,|,copy,cut,paste,|,rm,|,info"
     contextmenu-cwd="reload,back,|,upload,mkdir,mkfile,paste,|,info"
     contextmenu-files="open,download,|,copy,cut,paste,|,rm,edit,rename,|,info">
</div>
```

Header row with titles and filters automatic generated on compilation step.

# Sorting

Just add `sorting` attribute.
```html
<td sortable="title"></td>
```

# Filtering

```html
<td filter="{ 'title': 'text' }" filter-data="users"></td>
```

* `text` - Show text input for filtering
* `select` - Show selectbox for filtering, required `filter-data` attribute with name of function. This function must return `promise` for resolving data in select box
* `date` - simple date range
* `button` - show "Filter" button