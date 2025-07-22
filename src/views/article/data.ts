export const init =  {
    height: 500,
    menubar: false,
    plugins: [
      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
      'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
    ],
    toolbar: 'undo redo | blocks | ' +
      'bold italic forecolor | alignleft aligncenter ' +
      'alignright alignjustify | bullist numlist outdent indent | ' +
      'removeformat | help'
  }

  export const rules = {
    title: [
        { required: true, message: '请输入标题', trigger: 'blur' },
        { min: 3, max: 50, message: '标题长度在 3 到 50 个字符', trigger: 'blur' }
    ],
    content: [
        { required: true, message: '请输入内容', trigger: 'blur' },
        { min: 3, max: 500, message: '内容长度在 3 到 500 个字符', trigger: 'blur' }
    ],
    tagList: [
        { required: true, message: '请输入标签', trigger: 'blur' },
    ],
    categoryId: [
        { required: true, message: '请选择类别', trigger: 'change' }
    ],
    cover: [
        { required: true, message: '请输入封面', trigger: 'change' },
    ]
  }
