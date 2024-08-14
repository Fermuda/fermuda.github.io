// Returns the data of a JSON file.
// Yes this is named after of the Linux function.

export function neofetch(path){
    var data_recieved = {} // Will hold the values of the JSON file.

    fetch(path)
        .then(response => {
            if (!response.ok) {
                 throw new Error("Network response was not ok");
            }
            return response.json(); // Parse JSON data
        })
        .then(data => {
            // Because we aren't able to directly return the JSON data, we'll set its data to another dictionary and return that dictionary.
            for (const key in data) { // Loop through the returned JSON data, apply each key to our other dictionary.
                data_recieved[key] = data[key];
            }
            return data
        })
        .catch(error => {
            console.error("There has been a problem with your fetch operation:", error);
        });

    return data_recieved 
}
