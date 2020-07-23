function addRow() {
    $("#table > tbody").append(`
        <tr class="course">
            <td><input type="text" name="subject" class="form-control" placeholder="CSCI" maxlength=4 size=1 required></td>
            <td><input type="number" name="number" class="form-control" placeholder="101" min=0 max=999 size=1 required></td>
            <td><input type="number" name="section" class="form-control" placeholder="01" min=0 max=99 size=1 required></td>
            <td><button type="button" class="close" id="del">&times;</button></td>
        </tr>
        <tr class="result"><td colspan=4></td></tr>`
    );
}

$(function () {
    $("#add").click(addRow); /* call the addRow function when clicked */

    $("#table").on("click", "#del", function () {
        $(this).closest("tr.course").next("tr.result").remove();
        $(this).closest("tr.course").remove();
        if ($("#table > tbody tr").length == 0) { /* add empty row if we just removed the last row */
            addRow();
        }
    });

    $("#form").submit((event) => {
        $("tr.course").each(function(index, element) {
            var subject = $(this).find("input[name='subject']").val();
            var number = $(this).find("input[name='number']").val();
            var section = $(this).find("input[name='section']").val();
            //var name = [subject, number, section].join(' ');
            var disp = $(this).next("tr.result").children("td");
            
            $.post("https://us-east1-ismyclassonline.cloudfunctions.net/tag_scraper", {"subject": subject, "number": number, "section": section}, function (res) { /* post the string */
                console.log(res);
                disp.html(res);
            },
            "html").fail(function () { /* show fail message on error */
                alert("Failed");
            });
            disp.html(`
                <div class="text-center">
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>`
            )
        });
        $("tr.result").show(500);
        event.preventDefault();
    });
});
