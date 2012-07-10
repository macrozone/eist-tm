$(document).ready(function()
  {
    var persons = [];
    
    dataInterface.onPersonUpdateListeners.push(function(data)
      {
        persons = data; 
        updatePersonList();
      });
    
    $("#addUserForm").submit(function()
      {
        var person = 
        {
          
          firstname:  $(this).find("input[name=firstname]").val(),
          lastname: $(this).find("input[name=lastname]").val(),
          grade: $(this).find("input[name=grade]").val()
        };
        
        dataInterface.addPerson(person, function(error)
          {
            if(!error)
            {
              addOnePerson(person);
            }
            else
            {
              console.log(error); 
            }
          });
        
        
        return false;
      });
    
    function addOnePerson(person)
    {
      persons.unshift(person); 
      
      updatePersonList();
    }
    
    
    
    function updatePersonList()
    {
      var $table = $(".personTable");
      $table.empty();
      
      $.each(persons, function(index, person)
        {
          console.log(person);
          $row = $("<tr />").appendTo($table);
          $row.append($("<td />", {text: person.grade}));
          $row.append($("<td />", {text: person.lastname}));
          $row.append($("<td />", {text: person.firstname}));
          
        });
    }
    
    
  });
