<?php

namespace Sefirosweb\LaravelMailing\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MailingGroupRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => [
                'required',
                'min:3',
                'max:255',
                'unique:Sefirosweb\LaravelMailing\Http\Models\MailingGroup,name,' . $this->id
            ],
            'to' => [
                'required',
                'email:dns',
                'min:3',
                'max:255',
                'unique:Sefirosweb\LaravelMailing\Http\Models\MailingGroup,to,' . $this->id
            ],
            'description' => [
                'max:255',
            ],
        ];
    }
}
