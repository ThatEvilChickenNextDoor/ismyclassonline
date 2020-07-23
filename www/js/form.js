function addRow() {
    $("#table > tbody").append(`
        <tr class="course">
            <td><input type="text" name="subject" class="form-control" placeholder="CSCI" maxlength=4 size=1 required></td>
            <td><input type="number" name="number" class="form-control" placeholder="101" min=0 max=999 size=1 required></td>
            <td><input type="number" name="section" class="form-control" placeholder="01" min=0 max=99 size=1 required></td>
            <td><button type="button" class="close" id="del">&times;</button></td>
        </tr>
        <tr class="result"><td colspan=4>Result</td></tr>`
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
            $(this).next("tr.result").text(subject+number+section);
        });
       
        event.preventDefault();
    });
});
