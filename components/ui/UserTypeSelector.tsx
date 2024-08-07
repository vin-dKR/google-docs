import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


function UserTypeSelector({ userType, setUserType, onClickHandler }: UserTypeSelectorParams) {

    const accessChangeHandler = (type: UserType) => {
        setUserType(type)
        onClickHandler && onClickHandler(type)
    }
    return (
        <Select value={userType} onValueChange={(type: UserType) => accessChangeHandler(type)} >
            <SelectTrigger className="shad-select">
                <SelectValue />
            </SelectTrigger>
            <SelectContent className='border-none bg-dark-200'>
                <SelectItem value="viewer">can View</SelectItem>
                <SelectItem value="editor">can Edit</SelectItem>
            </SelectContent>
        </Select>

    )
}

export default UserTypeSelector
