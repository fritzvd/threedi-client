<todo>

  <!-- layout -->
  <h3>{ opts.title }</h3>
  <ul>
    <li each={ items }>{ title }</li>
  </ul>

  // logic comes here
  <script>
    require('./todo-logic.js')
  </script>

</todo>
