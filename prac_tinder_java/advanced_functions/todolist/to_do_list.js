
        const Arr1 = []

        const f_add = () => {
            const input = document.querySelector('.js-todo').value;
            const date = document.querySelector('.js-dueDate').value;
            if (input !== '') {
                Arr1.push({
                   input,
                   date
                   // this is equal to Arr1.input = input
                });
            }
            //need to render to output it
            f_render();
        }

        const f_render = () => {
            let todo = '';

            Arr1.forEach((arr,index) => {
                const {input, date} = arr;
                //these are equal to const input = arr.input and const date = arr.date
                const html = `<p>
                    ${input} ${date}
                    <button onclick = "deleteTodo(${index})">DELETE</button>
                    </p>`
                todo += html;
            });
 
            document.querySelector('.output').innerHTML = todo;
        }

        //Arrow function
        const deleteTodo = () => {
            Arr1.splice(index, 1);
            //need to call f_render again to make sure that it is updated
            f_render();
        }

        console.log(Arr1)
