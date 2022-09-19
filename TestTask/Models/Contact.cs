using System.ComponentModel.DataAnnotations;

namespace TestTask.Models
{
    public class Contact
    {
        public int Id { get; set; }

        [Display(Name = "Name")]
        public string Name { get; set; }

        [Display(Name = "Mabile phone")]
        public string MobilePhone { get; set; }

        [Display(Name = "Job title")]
        public string JobTitle { get; set; }

        [DataType(DataType.Date)]
        [Display(Name = "Birth date")]
        public DateTime BirthDate { get; set; }
    }
}