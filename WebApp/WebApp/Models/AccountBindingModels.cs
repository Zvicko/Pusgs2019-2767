using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace WebApp.Models
{
    // Models used as parameters to AccountController actions.

    public class AddExternalLoginBindingModel
    {
        [Required]
        [Display(Name = "External access token")]
        public string ExternalAccessToken { get; set; }
    }

    public class TicketPriceModel
    {
        [Required]
        [Display(Name = "TicketType")]
        public TypeOfTicket TicketType { get; set; }

        [Required]
        [Display(Name = "PassangerType")]
        public TypeOfPassanger PassangerType { get; set; }

        [Required]
        [Display(Name = "TransportationType")]
        public TypeOfTransportation TransportationType { get; set; }

    }

    public class TimeTableBindingModel
    {
        //[Required]
        //[Display(Name ="Id")]
        //public int Id { get; set; }

        [Required]
        [Display(Name = "TransportationType")]
        public TypeOfTransportation TransportationType { get; set; }

        [Required]
        [Display(Name = "DayType")]
        public TypeOfDay DayType { get; set; }

        [Required]
        [Display(Name = "LineNumber")]
        public int LineNumber { get; set; }
    }

    public class DepartureModel
    {
        [Required]
        [Display(Name = "TimeT")]
        public int TimeT { get; set; }

        [Required]
        [Display(Name = "DepartureDate")]
        public DateTime DepartureDate { get; set; }

        [Required]
        [Display(Name = "Time")]
        public TimeSpan Time { get; set; }


    }

    public class StationModel
    {
        [Display(Name = "Id")]
        public int Id { get; set; }

        [Required]
        [Display(Name = "Name")]
        public string Name { get; set; }

        [Required]
        [Display(Name = "Address")]
        public string Address { get; set; }

        [Required]
        [Display(Name = "Latitude")]
        public double Latitude { get; set; }

        [Required]
        [Display(Name = "Longitude")]
        public double Longitude { get; set; }
    }

    public class AddLineToStation
    {
        [Required]
        [Display(Name = "StationName")]
        public string StationName { get; set; }

        [Required]
        [Display(Name = "LineNumber")]
        public int LineNumber { get; set; }
    }

    public class BuyTicketModel
    {
        [Required]
        [Display(Name = "TicketType")]
        public TypeOfTicket TicketType { get; set; }

        [Required]
        [Display(Name = "PassangerType")]
        public TypeOfPassanger PassangerType { get; set; }

        [Required]
        [Display(Name = "TransportationType")]
        public TypeOfTransportation TransportationType { get; set; }

        [Required]
        [Display(Name = "Price")]
        public double Price { get; set; }

    }




    public class ChangePasswordBindingModel
    {
        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Current password")]
        public string OldPassword { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "New password")]
        public string NewPassword { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm new password")]
        [Compare("NewPassword", ErrorMessage = "The new password and confirmation password do not match.")]
        public string NewRepeatedPassword { get; set; }
    }

    public class RegisterBindingModel
    {
        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 5)]
        [Display(Name = "FullName")]
        public string FullName { get; set; }

        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Display(Name = "DateOfBirth")]
        public DateTime? DateOfBirth { get; set; }

        [Required]
        [Display(Name = "PassangerType")]
        public TypeOfPassanger PassangerType { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "RepeatedPassword")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string RepeatedPassword { get; set; }
    }

    public class EditUserBindingModel
    {
        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 5)]
        [Display(Name = "FullName")]
        public string FullName { get; set; }

        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Display(Name = "BirthDay")]
        public DateTime? BirthDay { get; set; }

        [Required]
        [Display(Name = "PassangerType")]
        public TypeOfPassanger PassangerType { get; set; }
    }

    public class VerifyUserModel
    {
        [Required]
        [Display(Name ="Id")]
        public int Id { get; set; }

        [Required]
        [Display(Name = "IsAccepted")]
        public bool IsAccepted { get; set; }
    }

    public class RegisterExternalBindingModel
    {
        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }

    public class RemoveLoginBindingModel
    {
        [Required]
        [Display(Name = "Login provider")]
        public string LoginProvider { get; set; }

        [Required]
        [Display(Name = "Provider key")]
        public string ProviderKey { get; set; }
    }

    public class SetPasswordBindingModel
    {
        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "New password")]
        public string NewPassword { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm new password")]
        [Compare("NewPassword", ErrorMessage = "The new password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }
}
